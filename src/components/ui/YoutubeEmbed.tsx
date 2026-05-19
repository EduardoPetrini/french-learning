interface YoutubeEmbedProps {
  videoId: string
  title: string
}

export function YoutubeEmbed({ videoId, title }: YoutubeEmbedProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ paddingTop: '56.25%' }}>
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
      />
    </div>
  )
}
