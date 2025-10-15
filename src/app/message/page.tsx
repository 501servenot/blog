'use client'
import Message from "@/components/Message"

export default function MessageBoard() {
    return (
      <div className="mt-10">
        <div className="mb-2 text-xl font-semibold">留言板</div>
        <Message />
      </div>
    );
}