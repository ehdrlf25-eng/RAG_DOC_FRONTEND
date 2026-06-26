import { apiRequest } from './client'

export type MessageRole = 'USER' | 'ASSISTANT'

export interface ConversationItem {
  id: number
  title: string
  createdAt: string
  updatedAt: string
}

export interface ChatMessageItem {
  id: number
  role: MessageRole
  content: string
  createdAt: string
}

export interface SourceChunkItem {
  documentId: number
  documentFilename: string
  sectionIndex: number
  chunkIndex: number
  sectionTitle: string
  childContent: string
  parentContent: string
  score: number
}

export interface ChatReply {
  userMessage: ChatMessageItem
  assistantMessage: ChatMessageItem
  sources: SourceChunkItem[]
}

/** RAG 채팅 대화 API. 메시지 전송 시 검색·LLM 답변이 한 번에 반환된다 */
export const conversationsApi = {
  list() {
    return apiRequest<ConversationItem[]>('/api/conversations')
  },

  create(title: string) {
    return apiRequest<ConversationItem>('/api/conversations', {
      method: 'POST',
      body: JSON.stringify({ title }),
    })
  },

  listMessages(conversationId: number) {
    return apiRequest<ChatMessageItem[]>(`/api/conversations/${conversationId}/messages`)
  },

  sendMessage(conversationId: number, content: string) {
    return apiRequest<ChatReply>(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    })
  },

  remove(conversationId: number) {
    return apiRequest<void>(`/api/conversations/${conversationId}`, {
      method: 'DELETE',
    })
  },
}
