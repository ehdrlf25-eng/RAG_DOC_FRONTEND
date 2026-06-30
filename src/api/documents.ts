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

/** 현재 사용자 소유 PDF 문서 API (서버에서 userId 소유권 검증) */
export const documentsApi = {
  list() {
    return apiRequest<DocumentItem[]>('/api/documents')
  },

  /** multipart/form-data로 PDF 업로드. ingest는 서버에서 Kafka 비동기 처리 */
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
