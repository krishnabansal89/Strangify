export default function ChatPage({params}: {params : {name: string}}) {
  return (
    <div>
      <h1>Chat</h1>
      <p>{params.name}</p>
    </div>
  );
}