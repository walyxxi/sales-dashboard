import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

export function MessageBubble({ message }) {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-8 w-8">
        {isUser ? (
          <>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>U</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AI</AvatarFallback>
          </>
        )}
      </Avatar>
      
      <div className="group flex flex-col">
        <div className={`
          max-w-[75%] rounded-lg px-3 py-2 text-sm
          ${isUser 
            ? "bg-primary text-primary-foreground ml-auto" 
            : "bg-secondary text-secondary-foreground"
          }
        `}>
          <p dangerouslySetInnerHTML={{ __html: message.content }} />
        </div>
        
        <span className={`
          text-xs text-muted-foreground mt-1
          ${isUser ? "text-right" : ""}
        `}>
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}

MessageBubble.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};