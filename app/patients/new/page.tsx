"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, User } from "lucide-react"
import Link from "next/link"

export default function NewPatient() {
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    weight: "",
    height: "",
    occupation: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    emergencyContact: "",
    emergencyPhone: "",
    observations: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria feita a integração com o backend
    console.log("Dados do paciente:", patientData)
    alert("Paciente cadastrado com sucesso!")
    window.location.href = "/dashboard"
  }

  const handleInputChange = (field: string, value: string) => {
    setPatientData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return ""
    const today = new Date()
    const birth = new Date(birthDate)
    const age = today.getFullYear() - birth.getFullYear()
    return age.toString()
  }

  const calculateBMI = () => {
    const weight = Number.parseFloat(patientData.weight)
    const height = Number.parseFloat(patientData.height) / 100 // converter cm para m
    if (weight && height) {
      return (weight / (height * height)).toFixed(1)
    }
    return ""
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Novo Paciente</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Dados Pessoais
              </CardTitle>
              <CardDescription>Informações básicas do paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={patientData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Digite o nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={patientData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={patientData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={patientData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Select onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                      <SelectItem value="nao-informar">Prefiro não informar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {patientData.birthDate && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Idade:</strong> {calculateAge(patientData.birthDate)} anos
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="occupation">Profissão/Ocupação</Label>
                <Input
                  id="occupation"
                  value={patientData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  placeholder="Ex: Estudante, Professora, etc."
                />
              </div>
            </CardContent>
          </Card>

          {/* Dados Antropométricos */}
          <Card>
            <CardHeader>
              <CardTitle>Dados Antropométricos</CardTitle>
              <CardDescription>Medidas corporais para avaliação nutricional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={patientData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="Ex: 65.5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm) *</Label>
                  <Input
                    id="height"
                    type="number"
                    value={patientData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="Ex: 165"
                    required
                  />
                </div>
              </div>

              {calculateBMI() && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>IMC Calculado:</strong> {calculateBMI()} kg/m²
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Histórico Clínico */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico Clínico</CardTitle>
              <CardDescription>Informações médicas relevantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Histórico Médico</Label>
                <Textarea
                  id="medicalHistory"
                  value={patientData.medicalHistory}
                  onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                  placeholder="Doenças prévias, cirurgias, internações..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentMedications">Medicações Atuais</Label>
                <Textarea
                  id="currentMedications"
                  value={patientData.currentMedications}
                  onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                  placeholder="Liste as medicações em uso..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Alergias e Intolerâncias</Label>
                <Textarea
                  id="allergies"
                  value={patientData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  placeholder="Alergias alimentares, medicamentosas..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contato de Emergência */}
          <Card>
            <CardHeader>
              <CardTitle>Contato de Emergência</CardTitle>
              <CardDescription>Pessoa para contato em caso de necessidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Nome do Contato</Label>
                  <Input
                    id="emergencyContact"
                    value={patientData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Telefone do Contato</Label>
                  <Input
                    id="emergencyPhone"
                    value={patientData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                  id="observations"
                  value={patientData.observations}
                  onChange={(e) => handleInputChange("observations", e.target.value)}
                  placeholder="Informações adicionais relevantes..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button type="submit" className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Salvar Paciente
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
