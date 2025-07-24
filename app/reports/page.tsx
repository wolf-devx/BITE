"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Download, FileText, Calendar, Filter, Search, Users } from "lucide-react"
import Link from "next/link"

// Dados simulados de relatórios
const availableReports = [
  {
    id: 1,
    patient: "Maria Silva",
    date: "2024-01-15",
    type: "BITE Individual",
    symptomsScore: 22,
    severityScore: 12,
    status: "Concluído",
  },
  {
    id: 2,
    patient: "Ana Costa",
    date: "2024-01-10",
    type: "BITE Individual",
    symptomsScore: 15,
    severityScore: 8,
    status: "Concluído",
  },
  {
    id: 3,
    patient: "Julia Santos",
    date: "2024-01-08",
    type: "BITE Individual",
    symptomsScore: 8,
    severityScore: 4,
    status: "Concluído",
  },
]

export default function Reports() {
  const [reportType, setReportType] = useState("")
  const [selectedPatient, setSelectedPatient] = useState("")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [selectedReports, setSelectedReports] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleReportSelection = (reportId: number, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, reportId])
    } else {
      setSelectedReports(selectedReports.filter((id) => id !== reportId))
    }
  }

  const generatePDF = (reportId?: number) => {
    // Simulação de geração de PDF
    const reportIds = reportId ? [reportId] : selectedReports
    console.log("Gerando PDF para relatórios:", reportIds)
    alert(`PDF gerado com sucesso para ${reportIds.length} relatório(s)!`)
  }

  const generateBulkReport = () => {
    // Simulação de relatório consolidado
    console.log("Gerando relatório consolidado")
    alert("Relatório consolidado gerado com sucesso!")
  }

  const filteredReports = availableReports.filter(
    (report) =>
      report.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Tipo de Relatório</Label>
                  <Select onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">BITE Individual</SelectItem>
                      <SelectItem value="consolidado">Relatório Consolidado</SelectItem>
                      <SelectItem value="evolucao">Evolução Temporal</SelectItem>
                      <SelectItem value="estatistico">Estatístico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Paciente</Label>
                  <Select onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os pacientes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maria">Maria Silva</SelectItem>
                      <SelectItem value="ana">Ana Costa</SelectItem>
                      <SelectItem value="julia">Julia Santos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Período</Label>
                  <div className="space-y-2">
                    <Input
                      type="date"
                      placeholder="Data inicial"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                    <Input
                      type="date"
                      placeholder="Data final"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={generateBulkReport} className="w-full bg-transparent" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Relatório Consolidado
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Relatórios */}
          <div className="lg:col-span-3 space-y-6">
            {/* Barra de Busca e Ações */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar relatórios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => generatePDF()} disabled={selectedReports.length === 0} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Selecionados ({selectedReports.length})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Relatórios Disponíveis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Relatórios Disponíveis
                </CardTitle>
                <CardDescription>{filteredReports.length} relatório(s) encontrado(s)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={selectedReports.includes(report.id)}
                          onCheckedChange={(checked) => handleReportSelection(report.id, checked as boolean)}
                        />
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 rounded-full p-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{report.patient}</h3>
                            <p className="text-sm text-gray-600">{report.type}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">Sintomas</p>
                          <p className="text-lg font-bold">{report.symptomsScore}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">Gravidade</p>
                          <p className="text-lg font-bold">{report.severityScore}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">Data</p>
                          <p className="text-sm text-gray-600">{new Date(report.date).toLocaleDateString("pt-BR")}</p>
                        </div>
                        <Button onClick={() => generatePDF(report.id)} variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Modelos de Relatório */}
            <Card>
              <CardHeader>
                <CardTitle>Modelos de Relatório</CardTitle>
                <CardDescription>Gere relatórios especializados baseados em diferentes critérios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-semibold">Relatório Populacional</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Análise estatística de todos os pacientes atendidos</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Gerar Relatório
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-semibold">Relatório Mensal</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Resumo das atividades e resultados do mês</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Gerar Relatório
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-purple-600 mr-2" />
                      <h3 className="font-semibold">Relatório de Risco</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Pacientes com escores de alto risco</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Gerar Relatório
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center mb-2">
                      <Download className="h-5 w-5 text-orange-600 mr-2" />
                      <h3 className="font-semibold">Backup de Dados</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Exportação completa dos dados para backup</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Exportar Dados
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
