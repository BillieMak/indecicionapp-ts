import { ref } from 'vue'
import type { ChatMessage } from '@/interfaces/chat-message.interface'
import type { ChatResponse } from '@/interfaces/yes-no.response'
import { sleep } from '@/helpers/sleep'

export const useChat = () => {
  const messages = ref<ChatMessage[]>([])

  const getResponse = async () => {
    const res = await fetch('https://yesno.wtf/api')

    const data: ChatResponse = await res.json()

    return data
  }

  const onMessage = async (text: string) => {
    if (!text) return
    if (text.length === 0) return

    messages.value.push({
      id: new Date().getTime(),
      itsMine: true,
      message: text
    })

    if (!text.endsWith('?')) return

    await sleep(1500)

    const { answer, image } = await getResponse()

    messages.value.push({
      id: new Date().getTime(),
      itsMine: false,
      message: answer,
      image
    })
  }

  return { messages, onMessage }
}
