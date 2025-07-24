"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Search,
  Book,
  HelpCircle,
  FileText,
  Video,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const faqData = [
  {
    category: "Protocolo BITE",
    questions: [
      {
        question: "O que é o protocolo BITE?",
        answer:
          "O BITE (Bulimic Investigatory Test of Edinburgh) é um instrumento de rastreamento para bulimia nervosa, composto por duas escalas: Sintomas (30 perguntas sim/não) e Gravidade (3 perguntas quantitativas).",
      },
      {
        question: "Como interpretar os escores do BITE?",
        answer:
          "Escala de Sintomas: ≥20 pontos indica alto risco para bulimia nervosa. Escala de Gravidade: ≥10 pontos indica nível severo de comportamentos compensatórios.",
      },
      {
        question: "Com que frequência devo aplicar o BITE?",
        answer:
          "Recomenda-se aplicação inicial e reavaliações a cada 2-4 semanas durante o tratamento, ou conforme indicação clínica.",
      },
    ],
  },
  {
    category: "Pacientes",
    questions: [
      {
        question: "Como cadastrar um novo paciente?",
        answer:
          "Acesse 'Novo Paciente' no dashboard, preencha os dados pessoais, antropométricos e histórico clínico. Todos os campos obrigatórios devem ser preenchidos.",
      },
      {
        question: "Posso editar dados de um paciente?",
        answer:
          "Sim, acesse o perfil do paciente e clique em 'Editar'. Alterações são registradas no histórico para auditoria.",
      },
      {
        question: "Como excluir um paciente?",
        answer:
          "Na lista de pacientes, use o menu de ações (três pontos) e selecione 'Excluir'. Esta ação é irreversível e remove todos os dados associados.",
      },
    ],
  },
  {
    category: "Relatórios",
    questions: [
      {
        question: "Como gerar um relatório PDF?",
        answer:
          "Acesse a seção 'Relatórios', selecione o paciente e período desejado, e clique em 'Gerar PDF'. O relatório inclui escores, interpretação e recomendações.",
      },
      {
        question: "Posso personalizar os relatórios?",
        answer:
          "Os relatórios seguem um modelo padronizado baseado em diretrizes clínicas. Você pode adicionar observações personalizadas no campo de comentários.",
      },
    ],
  },
  {
    category: "Segurança",
    questions: [
      {
        question: "Como os dados são protegidos?",
        answer:
          "Utilizamos criptografia AES-256, conexões HTTPS, backup automático e conformidade total com a LGPD. Dados são armazenados em servidores seguros no Brasil.",
      },
      {
        question: "Posso exportar meus dados?",
        answer:
          "Sim, acesse 'Configurações > Dados' para exportar todos os seus dados em formato JSON para backup pessoal.",
      },
    ],
  },
]

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

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
            <h1 className="text-2xl font-bold text-gray-900">Central de Ajuda</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Busca */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar na central de ajuda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guias</TabsTrigger>
            <TabsTrigger value="videos">Vídeos</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
          </TabsList>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Perguntas Frequentes
                </CardTitle>
                <CardDescription>Encontre respostas para as dúvidas mais comuns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredFAQ.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h3 className="text-lg font-semibold mb-4 text-blue-900">{category.category}</h3>
                      <div className="space-y-2">
                        {category.questions.map((faq, faqIndex) => {
                          const itemId = `${categoryIndex}-${faqIndex}`
                          const isOpen = openItems.includes(itemId)

                          return (
                            <Collapsible key={faqIndex}>
                              <CollapsibleTrigger
                                className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg"
                                onClick={() => toggleItem(itemId)}
                              >
                                <span className="font-medium">{faq.question}</span>
                                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                              </CollapsibleTrigger>
                              <CollapsibleContent className="px-4 py-3 text-gray-700">{faq.answer}</CollapsibleContent>
                            </Collapsible>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {filteredFAQ.length === 0 && searchTerm && (
                  <div className="text-center py-8">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
                    <p className="text-gray-600">Tente usar termos diferentes ou entre em contato conosco.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guias */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="h-5 w-5 mr-2 text-blue-600" />
                    Primeiros Passos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Aprenda a configurar sua conta e cadastrar o primeiro paciente
                  </p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ler Guia
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    Aplicando o BITE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Guia completo para aplicação e interpretação do protocolo BITE
                  </p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ler Guia
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-purple-600" />
                    Gerando Relatórios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Como criar e personalizar relatórios profissionais</p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ler Guia
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="h-5 w-5 mr-2 text-orange-600" />
                    Interpretação Clínica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Diretrizes para interpretação dos resultados do BITE</p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ler Guia
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="h-5 w-5 mr-2 text-red-600" />
                    Segurança e LGPD
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Boas práticas de segurança e conformidade com a LGPD</p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ler Guia
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="h-5 w-5 mr-2 text-teal-600" />
                    Backup e Exportação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Como fazer backup e exportar seus dados com segurança</p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ler Guia
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vídeos */}
          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="h-5 w-5 mr-2 text-red-600" />
                    Introdução à Plataforma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Visão geral da plataforma e suas principais funcionalidades (5:30)
                  </p>
                  <Button variant="outline" size="sm">
                    Assistir Vídeo
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="h-5 w-5 mr-2 text-red-600" />
                    Aplicando o Protocolo BITE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Passo a passo para aplicar o protocolo BITE corretamente (8:15)
                  </p>
                  <Button variant="outline" size="sm">
                    Assistir Vídeo
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="h-5 w-5 mr-2 text-red-600" />
                    Interpretando Resultados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Como interpretar os escores e tomar decisões clínicas (12:45)
                  </p>
                  <Button variant="outline" size="sm">
                    Assistir Vídeo
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="h-5 w-5 mr-2 text-red-600" />
                    Gerando Relatórios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Como criar relatórios profissionais e exportar dados (6:20)
                  </p>
                  <Button variant="outline" size="sm">
                    Assistir Vídeo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contato */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Entre em Contato</CardTitle>
                  <CardDescription>Nossa equipe está pronta para ajudar você</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-sm text-gray-600">suporte@plataformabite.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-sm text-gray-600">(11) 3000-0000</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Chat Online</p>
                      <p className="text-sm text-gray-600">Segunda a sexta, 8h às 18h</p>
                    </div>
                  </div>

                  <Button className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Iniciar Chat
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horários de Atendimento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Segunda a Sexta</span>
                      <span className="text-gray-600">8h às 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sábado</span>
                      <span className="text-gray-600">9h às 13h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Domingo</span>
                      <span className="text-gray-600">Fechado</span>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Suporte Técnico</h4>
                    <p className="text-sm text-blue-700">
                      Para questões técnicas urgentes, utilize o chat online ou envie um e-mail detalhando o problema.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Suporte Clínico</h4>
                    <p className="text-sm text-green-700">
                      Dúvidas sobre interpretação do BITE ou casos clínicos podem ser discutidas com nossa equipe
                      especializada.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recursos Adicionais */}
            <Card>
              <CardHeader>
                <CardTitle>Recursos Adicionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Book className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-2">Documentação</h3>
                    <p className="text-sm text-gray-600 mb-3">Acesse a documentação completa da plataforma</p>
                    <Button variant="outline" size="sm">
                      Acessar
                    </Button>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-2">Comunidade</h3>
                    <p className="text-sm text-gray-600 mb-3">Participe da comunidade de nutricionistas</p>
                    <Button variant="outline" size="sm">
                      Participar
                    </Button>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-2">Artigos</h3>
                    <p className="text-sm text-gray-600 mb-3">Leia artigos sobre transtornos alimentares</p>
                    <Button variant="outline" size="sm">
                      Ler
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
