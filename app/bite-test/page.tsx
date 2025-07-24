"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, FileText, AlertTriangle } from "lucide-react"
import Link from "next/link"

// Perguntas do protocolo BITE
const symptomsQuestions = [
  "Você tem medo de engordar?",
  "Você evita comer quando está com fome?",
  "Você se preocupa com comida?",
  "Você já teve episódios de comer descontroladamente?",
  "Você come até se sentir desconfortavelmente cheio(a)?",
  "Você se sente culpado(a) após comer?",
  "Você fica irritado(a) se não pode fazer exercício?",
  "Você conta calorias?",
  "Você evita alimentos com açúcar?",
  "Você evita alimentos com alto teor de carboidratos?",
  "Você se sente extremamente culpado(a) após comer doces?",
  "Você já provocou vômito para controlar seu peso?",
  "Você já usou laxantes para controlar seu peso?",
  "Você já usou diuréticos para controlar seu peso?",
  "Você já fez jejum por um dia inteiro para controlar peso?",
  "Se você comeu demais, no dia seguinte você restringe a alimentação?",
  "Você pesa a comida antes de comer?",
  "Você prefere comer sozinho(a)?",
  "Você conhece o conteúdo calórico dos alimentos que come?",
  "Você tem períodos regulares de comer e jejuar?",
  "Outras pessoas consideram você magro(a)?",
  "Você se preocupa em perder controle sobre o quanto come?",
  "Você divide a comida em porções pequenas?",
  "Você está ciente da quantidade de comida que come?",
  "Outras pessoas pressionam você a comer mais?",
  "Você vomita após as refeições?",
  "Você sofre de constipação?",
  "Você fica ansioso(a) antes de comer?",
  "Você evita comer em público?",
  "Você sente que a comida controla sua vida?",
]

const severityQuestions = [
  {
    question: "Quantas vezes por semana você provoca vômito?",
    options: [
      "Nunca",
      "1 vez",
      "2-3 vezes",
      "4-6 vezes",
      "1 vez por dia",
      "2-3 vezes por dia",
      "Mais de 3 vezes por dia",
    ],
  },
  {
    question: "Quantas vezes por semana você usa laxantes?",
    options: [
      "Nunca",
      "1 vez",
      "2-3 vezes",
      "4-6 vezes",
      "1 vez por dia",
      "2-3 vezes por dia",
      "Mais de 3 vezes por dia",
    ],
  },
  {
    question: "Quantas vezes por semana você usa diuréticos?",
    options: [
      "Nunca",
      "1 vez",
      "2-3 vezes",
      "4-6 vezes",
      "1 vez por dia",
      "2-3 vezes por dia",
      "Mais de 3 vezes por dia",
    ],
  },
]

export default function BiteTest() {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [currentStep, setCurrentStep] = useState(0) // 0: seleção, 1: sintomas, 2: gravidade, 3: resultado
  const [symptomsAnswers, setSymptomsAnswers] = useState<{ [key: number]: boolean }>({})
  const [severityAnswers, setSeverityAnswers] = useState<{ [key: number]: number }>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)

  // Pacientes simulados
  const patients = [
    { id: 1, name: "Maria Silva", age: 28 },
    { id: 2, name: "Ana Costa", age: 24 },
    { id: 3, name: "Julia Santos", age: 31 },
  ]

  const handleSymptomAnswer = (questionIndex: number, answer: boolean) => {
    setSymptomsAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }))
  }

  const handleSeverityAnswer = (questionIndex: number, answer: number) => {
    setSeverityAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }))
  }

  const calculateScores = () => {
    const symptomsScore = Object.values(symptomsAnswers).filter((answer) => answer).length
    const severityScore = Object.values(severityAnswers).reduce((sum, score) => sum + score, 0)

    return { symptomsScore, severityScore }
  }

  const getInterpretation = () => {
    const { symptomsScore, severityScore } = calculateScores()

    let symptomsRisk = "Baixo"
    let severityLevel = "Leve"

    if (symptomsScore >= 20) symptomsRisk = "Alto"
    else if (symptomsScore >= 10) symptomsRisk = "Moderado"

    if (severityScore >= 10) severityLevel = "Severo"
    else if (severityScore >= 5) severityLevel = "Moderado"

    return { symptomsRisk, severityLevel }
  }

  const nextQuestion = () => {
    if (currentStep === 1 && currentQuestion < symptomsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentStep === 1) {
      setCurrentStep(2)
      setCurrentQuestion(0)
    } else if (currentStep === 2 && currentQuestion < severityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (currentStep === 2) {
      setCurrentStep(1)
      setCurrentQuestion(symptomsQuestions.length - 1)
    }
  }

  const getProgress = () => {
    if (currentStep === 1) {
      return ((currentQuestion + 1) / symptomsQuestions.length) * 50
    } else if (currentStep === 2) {
      return 50 + ((currentQuestion + 1) / severityQuestions.length) * 50
    }
    return 100
  }

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Aplicar Protocolo BITE</h1>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Seleção do Paciente
              </CardTitle>
              <CardDescription>Selecione o paciente para aplicar o protocolo BITE</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Paciente</Label>
                <Select onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.name} - {patient.age} anos
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Sobre o Protocolo BITE</h3>
                <p className="text-sm text-blue-800 mb-2">
                  O BITE (Bulimic Investigatory Test of Edinburgh) é composto por duas escalas:
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • <strong>Escala de Sintomas:</strong> 30 perguntas (sim/não)
                  </li>
                  <li>
                    • <strong>Escala de Gravidade:</strong> 3 perguntas quantitativas
                  </li>
                </ul>
                <p className="text-sm text-blue-800 mt-2">
                  <strong>Interpretação:</strong> Sintomas ≥20 = risco alto | Gravidade ≥10 = nível severo
                </p>
              </div>

              <Button onClick={() => setCurrentStep(1)} disabled={!selectedPatient} className="w-full">
                Iniciar Aplicação
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === 3) {
    const { symptomsScore, severityScore } = calculateScores()
    const { symptomsRisk, severityLevel } = getInterpretation()
    const selectedPatientData = patients.find((p) => p.id.toString() === selectedPatient)

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <h1 className="text-2xl font-bold text-gray-900">Resultado do Protocolo BITE</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Informações do Paciente */}
            <Card>
              <CardHeader>
                <CardTitle>Paciente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{selectedPatientData?.name}</p>
                <p className="text-gray-600">{selectedPatientData?.age} anos</p>
                <p className="text-sm text-gray-500">Data da aplicação: {new Date().toLocaleDateString("pt-BR")}</p>
              </CardContent>
            </Card>

            {/* Resultados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Escala de Sintomas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{symptomsScore}/30</div>
                    <div
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        symptomsRisk === "Alto"
                          ? "bg-red-100 text-red-800"
                          : symptomsRisk === "Moderado"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      Risco {symptomsRisk}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Escala de Gravidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{severityScore}/18</div>
                    <div
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        severityLevel === "Severo"
                          ? "bg-red-100 text-red-800"
                          : severityLevel === "Moderado"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      Nível {severityLevel}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interpretação Clínica */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {(symptomsRisk === "Alto" || severityLevel === "Severo") && (
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  )}
                  Interpretação Clínica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Escala de Sintomas ({symptomsScore} pontos):</h4>
                  <p className="text-gray-700">
                    {symptomsScore >= 20
                      ? "Pontuação indica ALTO RISCO para bulimia nervosa. Recomenda-se avaliação clínica detalhada e acompanhamento especializado."
                      : symptomsScore >= 10
                        ? "Pontuação indica risco moderado. Monitoramento e avaliação nutricional recomendados."
                        : "Pontuação dentro da normalidade. Manter acompanhamento nutricional de rotina."}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Escala de Gravidade ({severityScore} pontos):</h4>
                  <p className="text-gray-700">
                    {severityScore >= 10
                      ? "Nível SEVERO de comportamentos bulímicos. Intervenção imediata necessária."
                      : severityScore >= 5
                        ? "Nível moderado de comportamentos compensatórios. Acompanhamento próximo recomendado."
                        : "Comportamentos compensatórios mínimos ou ausentes."}
                  </p>
                </div>

                {(symptomsRisk === "Alto" || severityLevel === "Severo") && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Atenção Clínica</h4>
                    <p className="text-red-700 text-sm">
                      Os resultados indicam necessidade de avaliação psicológica/psiquiátrica especializada. Considere
                      encaminhamento para equipe multidisciplinar.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ações */}
            <div className="flex justify-center space-x-4">
              <Button variant="outline">Gerar Relatório PDF</Button>
              <Button>Salvar Resultado</Button>
              <Link href="/dashboard">
                <Button variant="outline">Voltar ao Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentStep === 1 ? "Escala de Sintomas" : "Escala de Gravidade"}
            </h1>
            <div className="text-sm text-gray-600">
              {currentStep === 1
                ? `${currentQuestion + 1}/${symptomsQuestions.length}`
                : `${currentQuestion + 1}/${severityQuestions.length}`}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de Progresso */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>{Math.round(getProgress())}%</span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {currentStep === 1 ? symptomsQuestions[currentQuestion] : severityQuestions[currentQuestion].question}
            </CardTitle>
            {currentStep === 1 && (
              <CardDescription>Responda com sinceridade baseado no comportamento atual ou recente</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 ? (
              <RadioGroup
                value={symptomsAnswers[currentQuestion]?.toString() || ""}
                onValueChange={(value) => handleSymptomAnswer(currentQuestion, value === "true")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="yes" />
                  <Label htmlFor="yes" className="text-lg">
                    Sim
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="no" />
                  <Label htmlFor="no" className="text-lg">
                    Não
                  </Label>
                </div>
              </RadioGroup>
            ) : (
              <RadioGroup
                value={severityAnswers[currentQuestion]?.toString() || ""}
                onValueChange={(value) => handleSeverityAnswer(currentQuestion, Number.parseInt(value))}
              >
                {severityQuestions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0 && currentStep === 1}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>

              <Button
                onClick={nextQuestion}
                disabled={
                  currentStep === 1
                    ? symptomsAnswers[currentQuestion] === undefined
                    : severityAnswers[currentQuestion] === undefined
                }
              >
                {(currentStep === 1 && currentQuestion === symptomsQuestions.length - 1) ||
                (currentStep === 2 && currentQuestion === severityQuestions.length - 1)
                  ? "Finalizar"
                  : "Próxima"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
