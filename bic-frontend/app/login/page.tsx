"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRedirectIfAuthenticated } from "@/hooks/use-auth-redirect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Loader2,
  Lock,
  User,
  Shield,
  Fingerprint,
  Building2,
  Building,
  House,
  CircleDollarSign,
} from "lucide-react";

export default function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const usuarioRef = useRef<HTMLInputElement>(null);
  // Aceita email institucional ou usuário AD (ex: wallace.moreira)
  const isUsuarioValid = usuario.trim().length > 0 && (usuario.includes("@") || /^[a-zA-Z0-9_.-]+$/.test(usuario));
  const isPasswordValid = password.length >= 6;
  const isFormValid = isUsuarioValid && isPasswordValid;

  // Redirecionar se já estiver autenticado
  useRedirectIfAuthenticated();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!usuario || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    const result = await login(usuario, password);
    if (!result.success) {
      setError(result.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-itaguai-50 via-white to-itaguai-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-itaguai-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-itaguai-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-itaguai-100 to-transparent rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="w-full max-w-md space-y-8">
        {/* Card de Login */}
        <div className="w-full max-w-md mx-auto relative z-10 animate-slide-up">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-itaguai-lg border border-white/20 p-8 space-y-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-itaguai rounded-2xl shadow-itaguai relative">
                <House className="w-14 h-14 text-white drop-shadow-sm" />
                <div className="absolute top-14 right-3 w-4 h-4 bg-success-500 rounded-full flex items-center justify-center">
                  <CircleDollarSign className="w-4 h-4 text-white" />
                </div>
                
                {/* <div className="absolute -top-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div> */}
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-itaguai-900 tracking-tight">Sistema Bic</h1>
                <div className="space-y-1">
                  <p className="text-itaguai-700 font-medium">Prefeitura de Itaguaí</p>
                  <p className="text-sm text-itaguai-600">Acesse sua conta institucional</p>
                </div>
              </div>
            </div>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <Label
                    htmlFor="usuario"
                    className="text-sm font-semibold text-itaguai-900"
                  >
                    Usuário
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-itaguai-400" />
                    </div>
                    <Input
                      id="usuario"
                      type="text"
                      placeholder="Digite seu usuário"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      className="pl-12 h-14 text-base border-itaguai-200 rounded-xl focus:ring-2 focus:ring-itaguai-500 focus:border-itaguai-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-itaguai-900"
                    >
                      Senha
                    </Label>
                    <div className="absolute mt-4 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-itaguai-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      
                      className="pl-12 pr-14 h-14 text-base border-itaguai-200 rounded-xl focus:ring-2 focus:ring-itaguai-500 focus:border-itaguai-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                      placeholder="Digite sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-itaguai-400 hover:text-itaguai-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-itaguai-500 rounded-lg"
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 mt-7" />
                      ) : (
                        <Eye className="h-5 w-5 mt-7" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-full h-14 bg-gradient-itaguai hover:shadow-itaguai text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <Loader2 className="animate-spin w-5 h-5" />
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Shield className="w-5 h-5" />
                      <span>Entrar no Sistema</span>
                    </div>
                  )}
                </Button>
              </form>
              <div className="text-center space-y-4 pt-6 border-t border-itaguai-100 mt-8">
                <div className="flex items-center justify-center space-x-2 text-sm text-itaguai-600">
                  <Shield className="w-4 h-4 text-success-600" />
                  <span className="font-medium">Conexão segura e criptografada</span>
                </div>

                <div className="text-xs text-itaguai-500 space-y-1">
                  <p>© 2025 Prefeitura Municipal de Itaguaí</p>
                  <p>Desenvolvido pela Secretaria Municipal de Ciência, Tecnologia e Inovação</p>
                </div>
              </div>

            </CardContent>
          </div>

          {/* Footer */}

        </div>
      </div>
    </div>
  );
}
