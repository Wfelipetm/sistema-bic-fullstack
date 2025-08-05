const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require("dotenv");
const LdapStrategy = require('passport-ldapauth');
const passport = require('passport');




dotenv.config();

const authRoutes = require('./src/routes/authRoutes')
const boletimRoute = require('./src/routes/boletimRoutes');
const tecnicoRoute = require('./src/routes/tecnicoRoute');
const metragemRoutes = require('./src/routes/metragemRoute');
const infoLogradouroRoute = require('./src/routes/infoLogradouroRoute');
const infoTerrenoRoute = require('./src/routes/infoTerrenoRoute');
const infoConstrucaoRoute = require('./src/routes/infoConstrucaoRoute');
const situacaoRoute = require('./src/routes/situacaoRoute');
const caracterSoloRoute = require('./src/routes/caracterSoloRoute');
const topografiaRoute = require('./src/routes/topografiaRoute');
const nivelamentoRoute = require('./src/routes/nivelamentoRoute');
const serventiasRoute = require('./src/routes/serventiasRoute');
const avaliUrbaLogradouroRoute = require('./src/routes/avaliUrbaLogradouroRoute');
const calcamentoRoute = require('./src/routes/calcamentoRoute');
const tipoRoute = require('./src/routes/tipoRoute');
const usoRoute = require('./src/routes/usoRoute');
const tipoConstrucaoRoute = require('./src/routes/tipoConstrucaoRoute');
const esquadrilhaRoute = require('./src/routes/esquadrilhaRoute');
const pisoRoute = require('./src/routes/pisoRoute');
const forroRoute = require('./src/routes/forroRoute');
const coberturaRoute = require('./src/routes/coberturaRoute');
const acabamentoInternoRoute = require('./src/routes/acabamentoInternoRoute');
const acabamentoExternoRoute = require('./src/routes/acabamentoExternoRoute');
const obsLogradouroRoute = require('./src/routes/obsLogradouroRoute');
const relatoriosRouter = require('./src/routes/relatorioRoutes');
const jwt = require('./src/middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5001;


// Configuração do Passport com LDAP
passport.use(
  new LdapStrategy({
    server: {
      url: process.env.LDAP_URL,
      bindDN: process.env.LDAP_BIND_DN,
      bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
      searchBase: process.env.LDAP_SEARCH_BASE,
      searchFilter: process.env.LDAP_SEARCH_FILTER,
      searchAttributes: [
        'sAMAccountName', 'cn', 'mail', 'memberOf', 'description', 'department', 'dn'
      ],
      tlsOptions: { rejectUnauthorized: false }
    },
    usernameField: 'username',
    passwordField: 'password'
  })
);




// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Teste rápido de rota
app.get('/', (req, res) => {
  res.send('Servidor HTTPS funcionando com certificado válido!');
});

// Rotas
app.use('/auth', authRoutes);
app.use('/boletim', jwt.validarToken, boletimRoute);
app.use('/tecnicos', jwt.validarToken, tecnicoRoute);
app.use('/metragem', jwt.validarToken, metragemRoutes);
app.use('/info-logradouro', jwt.validarToken, infoLogradouroRoute);
app.use('/info-terreno', jwt.validarToken, infoTerrenoRoute);
app.use('/info-construcao', jwt.validarToken, infoConstrucaoRoute);
app.use('/situacao', jwt.validarToken, situacaoRoute);
app.use('/caracter-solo', jwt.validarToken, caracterSoloRoute);
app.use('/topografia', jwt.validarToken, topografiaRoute);
app.use('/nivelamento', jwt.validarToken, nivelamentoRoute);
app.use('/serventias', jwt.validarToken, serventiasRoute);
app.use('/avali-urba-logradouro', jwt.validarToken, avaliUrbaLogradouroRoute);
app.use('/calcamento', jwt.validarToken, calcamentoRoute);
app.use('/tipo', jwt.validarToken, tipoRoute);
app.use('/uso', jwt.validarToken, usoRoute);
app.use('/tipo-construcao', jwt.validarToken, tipoConstrucaoRoute);
app.use('/esquadrilha', jwt.validarToken, esquadrilhaRoute);
app.use('/piso', jwt.validarToken, pisoRoute);
app.use('/forro', jwt.validarToken, forroRoute);
app.use('/cobertura', jwt.validarToken, coberturaRoute);
app.use('/acabamento-interno', jwt.validarToken, acabamentoInternoRoute);
app.use('/acabamento-externo', jwt.validarToken, acabamentoExternoRoute);
app.use('/obs-logradouro', jwt.validarToken, obsLogradouroRoute);
app.use('/relatorios', jwt.validarToken, relatoriosRouter);

// Arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'upload', 'upBoletim')));

// Certificados SSL
// const sslOptions = {
//   key: fs.readFileSync('/etc/letsencrypt/live/bic.itaguai.rj.gov.br/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/bic.itaguai.rj.gov.br/fullchain.pem')
// };

// Servidor HTTPS
// https.createServer(sslOptions, app).listen(PORT, () => {
//   console.log(`HTTPS rodando em https://bic.itaguai.rj.gov.br:${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;

