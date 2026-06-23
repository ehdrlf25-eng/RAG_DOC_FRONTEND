import { apiRequest } from './client'

export type DocumentStatus = 'PROCESSING' | 'READY' | 'FAILED'

export interface DocumentItem {
  id: number
  originalFilename: string
  status: DocumentStatus
  pageCount: number | null
  chunkCount: number
  createdAt: string
  updatedAt: string
}

export const documentsApi = {
  list() {
    return apiRequest<DocumentItem[]>('/api/documents')
  },

  upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return apiRequest<DocumentItem>('/api/documents', {
      method: 'POST',
      body: formData,
    })
  },

  remove(documentId: number) {
    return apiRequest<void>(`/api/documents/${documentId}`, {
      method: 'DELETE',
    })
  },
}
