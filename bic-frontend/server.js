const { createServer: createHTTPServer } = require('http');
const { createServer: createHTTPSServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

// Carregar variáveis do .env
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 443;

// Caminhos dos certificados SSL (use variáveis do .env)
const certPaths = {
    key: process.env.SSL_KEY_PATH || '/etc/letsencrypt/live/bic.itaguai.rj.gov.br/privkey.pem',
    cert: process.env.SSL_CERT_PATH || '/etc/letsencrypt/live/bic.itaguai.rj.gov.br/fullchain.pem'
};

let httpsOptions;
try {
    httpsOptions = {
        key: fs.readFileSync(certPaths.key),
        cert: fs.readFileSync(certPaths.cert),
        secureProtocol: 'TLSv1_2_method',
        honorCipherOrder: true
    };
    console.log('Certificados SSL carregados com sucesso');
} catch (error) {
    console.error('Erro ao carregar certificados SSL:', error.message);
    process.exit(1);
}

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    // Inicia o servidor HTTPS para servir a aplicação Next.js de forma segura
    createHTTPSServer(httpsOptions, (req, res) => {
        try {
            const parsedUrl = parse(req.url, true); // Analisa a URL da requisição
            handle(req, res, parsedUrl); // Entrega a requisição para o Next.js
        } catch (error) {
            // Se ocorrer erro, retorna status 500 e mensagem
            console.error('Erro interno:', error);
            res.statusCode = 500;
            res.end('Erro interno do servidor');
        }
    }).listen(port, err => {
        if (err) {
            // Se não conseguir iniciar o servidor HTTPS, encerra o processo
            console.error('Erro ao iniciar servidor HTTPS:', err);
            process.exit(1);
        }
        // Mensagem informando que o servidor HTTPS está rodando
        console.log(`Servidor HTTPS rodando em https://${hostname}:${port}`);
    });

    // Inicia o servidor HTTP na porta 80 apenas para redirecionar todo acesso para HTTPS
    createHTTPServer((req, res) => {
        // Garante que qualquer acesso por HTTP seja redirecionado para HTTPS
        const host = req.headers.host ? req.headers.host.replace(/:\d+$/, '') : hostname;
        res.writeHead(301, { Location: `https://${host}${req.url}` });
        res.end();
    }).listen(80, () => {
        // Mensagem informando que o redirecionamento está ativo
        console.log('Redirecionamento HTTP para HTTPS ativo na porta 80');
    });
}).catch(error => {
    // Se ocorrer erro ao preparar o Next.js, encerra o processo
    console.error('Erro ao preparar Next.js:', error);
    process.exit(1);
});

