import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppAvatar = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="bg-gray-300">{alt.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>

  )
}

export default AppAvatar