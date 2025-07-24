"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  Plus,
  User,
  Calendar,
  AlertTriangle,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Dados simulados de pacientes
const patientsData = [
  {
    id: 1,
    name: "Maria Silva",
    age: 28,
    gender: "Feminino",
    email: "maria.silva@email.com",
    phone: "(11) 99999-9999",
    lastVisit: "2024-01-15",
    testsCount: 4,
    lastBiteScore: { symptoms: 22, severity: 12 },
    riskLevel: "Alto",
    status: "Ativo",
    registrationDate: "2023-10-01",
  },
  {
    id: 2,
    name: "Ana Costa",
    age: 24,
    gender: "Feminino",
    email: "ana.costa@email.com",
    phone: "(11) 88888-8888",
    lastVisit: "2024-01-10",
    testsCount: 3,
    lastBiteScore: { symptoms: 15, severity: 8 },
    riskLevel: "Moderado",
    status: "Ativo",
    registrationDate: "2023-11-15",
  },
  {
    id: 3,
    name: "Julia Santos",
    age: 31,
    gender: "Feminino",
    email: "julia.santos@email.com",
    phone: "(11) 77777-7777",
    lastVisit: "2024-01-08",
    testsCount: 2,
    lastBiteScore: { symptoms: 8, severity: 4 },
    riskLevel: "Baixo",
    status: "Ativo",
    registrationDate: "2023-12-01",
  },
  {
    id: 4,
    name: "Carla Oliveira",
    age: 26,
    gender: "Feminino",
    email: "carla.oliveira@email.com",
    phone: "(11) 66666-6666",
    lastVisit: "2023-12-20",
    testsCount: 1,
    lastBiteScore: { symptoms: 12, severity: 6 },
    riskLevel: "Moderado",
    status: "Inativo",
    registrationDate: "2023-09-10",
  },
  {
    id: 5,
    name: "Fernanda Lima",
    age: 29,
    gender: "Feminino",
    email: "fernanda.lima@email.com",
    phone: "(11) 55555-5555",
    lastVisit: "2024-01-12",
    testsCount: 5,
    lastBiteScore: { symptoms: 25, severity: 14 },
    riskLevel: "Alto",
    status: "Ativo",
    registrationDate: "2023-08-15",
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRisk, setFilterRisk] = useState("Todos")
  const [filterStatus, setFilterStatus] = useState("Todos")
  const [sortBy, setSortBy] = useState("name")

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

  const getStatusColor = (status: string) => {
    return status === "Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const filteredPatients = patientsData
    .filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRisk = filterRisk === "Todos" || patient.riskLevel === filterRisk
      const matchesStatus = filterStatus === "Todos" || patient.status === filterStatus
      return matchesSearch && matchesRisk && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "lastVisit":
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
        case "riskLevel":
          const riskOrder = { Alto: 3, Moderado: 2, Baixo: 1 }
          return riskOrder[b.riskLevel as keyof typeof riskOrder] - riskOrder[a.riskLevel as keyof typeof riskOrder]
        default:
          return 0
      }
    })

  const handleDeletePatient = (patientId: number) => {
    if (confirm("Tem certeza que deseja excluir este paciente? Esta ação não pode ser desfeita.")) {
      console.log("Excluindo paciente:", patientId)
      // Aqui seria feita a exclusão no backend
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Pacientes</h1>
            </div>
            <Link href="/patients/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Paciente
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{patientsData.length}</div>
                <p className="text-sm text-gray-600">Total de Pacientes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {patientsData.filter((p) => p.status === "Ativo").length}
                </div>
                <p className="text-sm text-gray-600">Pacientes Ativos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {patientsData.filter((p) => p.riskLevel === "Alto").length}
                </div>
                <p className="text-sm text-gray-600">Alto Risco</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{patientsData.reduce((sum, p) => sum + p.testsCount, 0)}</div>
                <p className="text-sm text-gray-600">Testes Aplicados</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              <div className="flex gap-2">
                <Select onValueChange={setFilterRisk}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Nível de Risco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Alto">Alto Risco</SelectItem>
                    <SelectItem value="Moderado">Risco Moderado</SelectItem>
                    <SelectItem value="Baixo">Baixo Risco</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nome</SelectItem>
                    <SelectItem value="lastVisit">Última Visita</SelectItem>
                    <SelectItem value="riskLevel">Nível de Risco</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Pacientes */}
        <Card>
          <CardHeader>
            <CardTitle>Pacientes ({filteredPatients.length})</CardTitle>
            <CardDescription>Lista completa de pacientes cadastrados na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>
                          {patient.age} anos • {patient.gender}
                        </span>
                        <span>{patient.email}</span>
                        <span>{patient.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium">Última Visita</p>
                      <p className="text-sm text-gray-600">{new Date(patient.lastVisit).toLocaleDateString("pt-BR")}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-medium">Testes</p>
                      <p className="text-lg font-bold">{patient.testsCount}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-medium">Último BITE</p>
                      <div className="flex space-x-1">
                        <span className="text-sm font-bold">{patient.lastBiteScore.symptoms}</span>
                        <span className="text-sm text-gray-500">/</span>
                        <span className="text-sm font-bold">{patient.lastBiteScore.severity}</span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskLevel}</Badge>
                      <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                    </div>

                    {patient.riskLevel === "Alto" && <AlertTriangle className="h-5 w-5 text-red-500" />}

                    <div className="flex space-x-2">
                      <Link href={`/patients/${patient.id}`}>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </Link>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />
                            Novo Teste BITE
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Relatório PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeletePatient(patient.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum paciente encontrado</h3>
                <p className="text-gray-600 mb-4">Tente ajustar os filtros ou cadastre um novo paciente.</p>
                <Link href="/patients/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Cadastrar Primeiro Paciente
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
