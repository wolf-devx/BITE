"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Calendar, FileText, TrendingUp, Download, Plus, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Dados simulados do paciente
const patientData = {
  id: 1,
  name: "Maria Silva",
  email: "maria.silva@email.com",
  phone: "(11) 99999-9999",
  birthDate: "1995-03-15",
  age: 28,
  gender: "Feminino",
  weight: 58.5,
  height: 165,
  bmi: 21.5,
  occupation: "Designer Gráfica",
  emergencyContact: "João Silva",
  emergencyPhone: "(11) 88888-8888",
  medicalHistory: "Histórico de ansiedade. Sem outras comorbidades relevantes.",
  currentMedications: "Sertralina 50mg - 1x ao dia",
  allergies: "Lactose (intolerância)",
  observations: "Paciente muito colaborativa. Busca tratamento por conta própria.",
}

// Histórico de testes BITE
const testHistory = [
  {
    date: "2024-01-15",
    symptomsScore: 22,
    severityScore: 12,
    symptomsRisk: "Alto",
    severityLevel: "Severo",
    observations:
      "Primeira aplicação. Paciente relatou episódios frequentes de compulsão alimentar seguidos de vômito.",
  },
  {
    date: "2023-12-10",
    symptomsScore: 25,
    severityScore: 15,
    symptomsRisk: "Alto",
    severityLevel: "Severo",
    observations: "Piora dos sintomas. Aumentou frequência de comportamentos compensatórios.",
  },
  {
    date: "2023-11-05",
    symptomsScore: 18,
    severityScore: 8,
    symptomsRisk: "Moderado",
    severityLevel: "Moderado",
    observations: "Melhora discreta após início do acompanhamento nutricional.",
  },
  {
    date: "2023-10-01",
    symptomsScore: 28,
    severityScore: 16,
    symptomsRisk: "Alto",
    severityLevel: "Severo",
    observations: "Avaliação inicial. Quadro severo de bulimia nervosa.",
  },
]

// Dados para o gráfico de evolução
const chartData = testHistory.reverse().map((test) => ({
  date: new Date(test.date).toLocaleDateString("pt-BR", { month: "short", day: "2-digit" }),
  sintomas: test.symptomsScore,
  gravidade: test.severityScore,
}))

export default function PatientDetail() {
  const [activeTab, setActiveTab] = useState("overview")

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Alto":
        return "bg-red-100 text-red-800"
      case "Moderado":
        return "bg-yellow-100 text-yellow-800"
      case "Baixo":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const latestTest = testHistory[0]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{patientData.name}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Relatório PDF
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Novo Teste BITE
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="history">Histórico BITE</TabsTrigger>
            <TabsTrigger value="evolution">Evolução</TabsTrigger>
            <TabsTrigger value="clinical">Dados Clínicos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Informações do Paciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Nome</p>
                      <p className="text-base">{patientData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Idade</p>
                      <p className="text-base">{patientData.age} anos</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Gênero</p>
                      <p className="text-base">{patientData.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Profissão</p>
                      <p className="text-base">{patientData.occupation}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Peso</p>
                      <p className="text-base">{patientData.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Altura</p>
                      <p className="text-base">{patientData.height} cm</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">IMC</p>
                      <p className="text-base">{patientData.bmi} kg/m²</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Contato</p>
                      <p className="text-base">{patientData.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Último Teste BITE</CardTitle>
                  <CardDescription>{new Date(latestTest.date).toLocaleDateString("pt-BR")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{latestTest.symptomsScore}/30</div>
                    <p className="text-sm text-gray-600 mb-2">Escala de Sintomas</p>
                    <Badge className={getRiskColor(latestTest.symptomsRisk)}>Risco {latestTest.symptomsRisk}</Badge>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{latestTest.severityScore}/18</div>
                    <p className="text-sm text-gray-600 mb-2">Escala de Gravidade</p>
                    <Badge
                      className={getRiskColor(
                        latestTest.severityLevel === "Severo"
                          ? "Alto"
                          : latestTest.severityLevel === "Moderado"
                            ? "Moderado"
                            : "Baixo",
                      )}
                    >
                      Nível {latestTest.severityLevel}
                    </Badge>
                  </div>

                  {(latestTest.symptomsRisk === "Alto" || latestTest.severityLevel === "Severo") && (
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      <p className="text-sm text-red-700">Requer atenção clínica</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Resumo Clínico */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo Clínico Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{latestTest.observations}</p>

                  {latestTest.symptomsRisk === "Alto" && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <h4 className="font-semibold text-amber-800 mb-2">Recomendações Clínicas:</h4>
                      <ul className="text-amber-700 text-sm space-y-1">
                        <li>• Acompanhamento nutricional semanal</li>
                        <li>• Avaliação psicológica especializada</li>
                        <li>• Monitoramento de sinais vitais</li>
                        <li>• Reaplicação do BITE em 2 semanas</li>
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Histórico de Aplicações BITE
                </CardTitle>
                <CardDescription>Registro completo de todas as aplicações do protocolo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {testHistory.map((test, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-6 pb-6 last:pb-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 rounded-full p-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">
                              {new Date(test.date).toLocaleDateString("pt-BR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {index === 0 ? "Mais recente" : `${index + 1}ª aplicação`}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold">{test.symptomsScore}/30</div>
                          <p className="text-sm text-gray-600">Sintomas</p>
                          <Badge className={getRiskColor(test.symptomsRisk)} size="sm">
                            {test.symptomsRisk}
                          </Badge>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold">{test.severityScore}/18</div>
                          <p className="text-sm text-gray-600">Gravidade</p>
                          <Badge
                            className={getRiskColor(
                              test.severityLevel === "Severo"
                                ? "Alto"
                                : test.severityLevel === "Moderado"
                                  ? "Moderado"
                                  : "Baixo",
                            )}
                            size="sm"
                          >
                            {test.severityLevel}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-center">
                          {(test.symptomsRisk === "Alto" || test.severityLevel === "Severo") && (
                            <div className="flex items-center text-red-600">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              <span className="text-sm font-medium">Atenção</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Observações Clínicas:</h4>
                        <p className="text-sm text-gray-700">{test.observations}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evolution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Gráfico de Evolução
                </CardTitle>
                <CardDescription>Acompanhamento dos escores BITE ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [
                          value,
                          name === "sintomas" ? "Escala de Sintomas" : "Escala de Gravidade",
                        ]}
                      />
                      <Line type="monotone" dataKey="sintomas" stroke="#ef4444" strokeWidth={3} name="sintomas" />
                      <Line type="monotone" dataKey="gravidade" stroke="#f59e0b" strokeWidth={3} name="gravidade" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Escala de Sintomas</h4>
                    <p className="text-sm text-red-700">
                      Linha vermelha representa a pontuação de sintomas (0-30). Valores ≥20 indicam alto risco para
                      bulimia nervosa.
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Escala de Gravidade</h4>
                    <p className="text-sm text-amber-700">
                      Linha amarela representa comportamentos compensatórios (0-18). Valores ≥10 indicam nível severo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Análise de Tendência */}
            <Card>
              <CardHeader>
                <CardTitle>Análise de Tendência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Observações da Evolução:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Melhora gradual nos escores de sintomas desde outubro/2023</li>
                      <li>• Redução significativa nos comportamentos compensatórios</li>
                      <li>• Resposta positiva ao tratamento nutricional</li>
                      <li>• Necessário manter acompanhamento regular</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clinical" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Dados Antropométricos */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados Antropométricos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Peso Atual</p>
                      <p className="text-lg font-semibold">{patientData.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Altura</p>
                      <p className="text-lg font-semibold">{patientData.height} cm</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">IMC</p>
                      <p className="text-lg font-semibold">{patientData.bmi} kg/m²</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Classificação</p>
                      <p className="text-lg font-semibold text-green-600">Normal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contato de Emergência */}
              <Card>
                <CardHeader>
                  <CardTitle>Contato de Emergência</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nome</p>
                    <p className="text-base">{patientData.emergencyContact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telefone</p>
                    <p className="text-base">{patientData.emergencyPhone}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Histórico Médico */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico Médico</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Histórico Clínico</h4>
                  <p className="text-gray-700">{patientData.medicalHistory}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Medicações Atuais</h4>
                  <p className="text-gray-700">{patientData.currentMedications}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Alergias e Intolerâncias</h4>
                  <p className="text-gray-700">{patientData.allergies}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Observações Gerais</h4>
                  <p className="text-gray-700">{patientData.observations}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
