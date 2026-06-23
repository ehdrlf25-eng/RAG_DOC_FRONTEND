import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileLines,
  faPaperPlane,
  faPlus,
  faRightFromBracket,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { conversationsApi, type ChatMessageItem, type ConversationItem } from '../api/conversations'
import { documentsApi, type DocumentItem, type DocumentStatus } from '../api/documents'
import { useAuth } from '../contexts/AuthContext'
import { useLocale } from '../contexts/LocaleContext'

export function HomePage() {
  const { user, logout } = useAuth()
  const { t } = useLocale()

  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [conversations, setConversations] = useState<ConversationItem[]>([])
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null)
  const [messages, setMessages] = useState<ChatMessageItem[]>([])
  const [draft, setDraft] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  function documentStatusLabel(status: DocumentStatus) {
    if (status === 'PROCESSING') {
      return t('documents.status.processing')
    }
    if (status === 'FAILED') {
      return t('documents.status.failed')
    }
    return t('documents.status.ready')
  }

  const loadDocuments = useCallback(async () => {
    const items = await documentsApi.list()
    setDocuments(items)
  }, [])

  const loadConversations = useCallback(async () => {
    const items = await conversationsApi.list()
    setConversations(items)
    if (items.length > 0) {
      setActiveConversationId((current) => current ?? items[0].id)
    }
  }, [])

  const loadMessages = useCallback(async (conversationId: number) => {
    const items = await conversationsApi.listMessages(conversationId)
    setMessages(items)
  }, [])

  useEffect(() => {
    void Promise.all([loadDocuments(), loadConversations()]).catch((err: Error) => {
      setError(err.message)
    })
  }, [loadDocuments, loadConversations])

  useEffect(() => {
    if (activeConversationId == null) {
      setMessages([])
      return
    }
    void loadMessages(activeConversationId).catch((err: Error) => {
      setError(err.message)
    })
  }, [activeConversationId, loadMessages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  async function handleUpload(file: File) {
    setError(null)
    setIsUploading(true)
    try {
      const uploaded = await documentsApi.upload(file)
      setDocuments((current) => [uploaded, ...current])
    } catch (err) {
      setError(err instanceof Error ? err.message : t('documents.uploadFailed'))
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  async function handleDeleteDocument(documentId: number) {
    setError(null)
    try {
      await documentsApi.remove(documentId)
      setDocuments((current) => current.filter((item) => item.id !== documentId))
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.requestError'))
    }
  }

  async function handleCreateConversation() {
    setError(null)
    try {
      const title = t('chat.defaultTitle', { index: String(conversations.length + 1) })
      const conversation = await conversationsApi.create(title)
      setConversations((current) => [conversation, ...current])
      setActiveConversationId(conversation.id)
      setMessages([])
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.requestError'))
    }
  }

  async function handleSendMessage() {
    if (!draft.trim() || isSending) {
      return
    }

    setError(null)
    setIsSending(true)

    try {
      let conversationId = activeConversationId
      if (conversationId == null) {
        const title = t('chat.defaultTitle', { index: String(conversations.length + 1) })
        const conversation = await conversationsApi.create(title)
        setConversations((current) => [conversation, ...current])
        conversationId = conversation.id
        setActiveConversationId(conversation.id)
      }

      const reply = await conversationsApi.sendMessage(conversationId, draft.trim())
      setMessages((current) => [...current, reply.userMessage, reply.assistantMessage])
      setDraft('')
      setConversations((current) =>
        current.map((item) =>
          item.id === conversationId
            ? { ...item, updatedAt: reply.assistantMessage.createdAt }
            : item,
        ),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : t('chat.sendFailed'))
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-sky-50">
      <header className="border-b border-white/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 pr-44">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
              <FontAwesomeIcon icon={faFileLines} />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{t('common.appName')}</p>
              <p className="text-xs text-slate-500">{t('home.title')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              {t('home.welcome', { name: user?.name ?? '' })}
            </span>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-200 hover:text-brand-700"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              {t('home.logout')}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">{t('documents.title')}</h2>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-600 disabled:opacity-60"
              >
                <FontAwesomeIcon icon={faUpload} />
                {isUploading ? t('documents.uploading') : t('documents.upload')}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) {
                    void handleUpload(file)
                  }
                }}
              />
            </div>

            <div className="space-y-3">
              {documents.length === 0 ? (
                <p className="text-sm text-slate-500">{t('documents.empty')}</p>
              ) : (
                documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {document.originalFilename}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {documentStatusLabel(document.status)} ·{' '}
                        {t('documents.chunkCount', { count: String(document.chunkCount) })}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleDeleteDocument(document.id)}
                      className="text-slate-400 transition hover:text-red-500"
                      aria-label={t('documents.delete')}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">{t('chat.conversations')}</h2>
              <button
                type="button"
                onClick={() => void handleCreateConversation()}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-200 hover:text-brand-700"
              >
                <FontAwesomeIcon icon={faPlus} />
                {t('chat.newConversation')}
              </button>
            </div>

            <div className="space-y-2">
              {conversations.length === 0 ? (
                <p className="text-sm text-slate-500">{t('chat.noConversations')}</p>
              ) : (
                conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() => setActiveConversationId(conversation.id)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                      activeConversationId === conversation.id
                        ? 'bg-brand-50 font-medium text-brand-700'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {conversation.title}
                  </button>
                ))
              )}
            </div>
          </section>
        </aside>

        <section className="flex min-h-[70vh] flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="font-semibold text-slate-900">{t('chat.title')}</h2>
            <p className="text-sm text-slate-500">{t('chat.subtitle')}</p>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            {messages.length === 0 ? (
              <p className="text-sm text-slate-500">{t('chat.empty')}</p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-3xl rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === 'USER'
                      ? 'ml-auto bg-brand-500 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {message.content}
                </div>
              ))
            )}
            {isSending ? (
              <p className="text-sm text-slate-500">{t('chat.thinking')}</p>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          {error ? (
            <div className="px-6 pb-2 text-sm text-red-600">{error}</div>
          ) : null}

          <div className="border-t border-slate-100 px-6 py-4">
            <div className="flex gap-3">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    void handleSendMessage()
                  }
                }}
                rows={3}
                placeholder={t('chat.placeholder')}
                className="flex-1 resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="button"
                onClick={() => void handleSendMessage()}
                disabled={isSending || !draft.trim()}
                className="inline-flex h-fit items-center gap-2 self-end rounded-2xl bg-brand-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-600 disabled:opacity-60"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                {t('chat.send')}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
