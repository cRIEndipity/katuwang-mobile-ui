import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

interface MarkdownContentProps {
  content: string
  compact?: boolean
  inverted?: boolean
  className?: string
}

// Reusable markdown content renderer
export function MarkdownContent({ 
  content, 
  compact = false, 
  inverted = false,
  className = '' 
}: MarkdownContentProps) {
  let components = markdownComponents

  if (compact && inverted) {
    components = markdownComponentsCompactInverted
  } else if (compact) {
    components = markdownComponentsCompact
  } else if (inverted) {
    components = markdownComponentsInverted
  }

  return (
    <div className={`max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

/** 
 * Shared ReactMarkdown component configuration
 */
// ... (Standard Dark Theme Components - Keep as is, but defined here for completeness of valid file)
const markdownComponents: Components = {
  h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mb-4" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-white mb-3 mt-6" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-white mb-2 mt-4" {...props} />,
  p: ({ node, ...props }) => <p className="text-gray-200 mb-3 leading-relaxed" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
  em: ({ node, ...props }) => <em className="italic text-gray-300" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-200 mb-3 space-y-1" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-200 mb-3 space-y-1" {...props} />,
  li: ({ node, ...props }) => <li className="text-gray-200 ml-4" {...props} />,
  code: ({ node, ...props }) => <code className="bg-gray-800 px-2 py-1 rounded text-blue-300 text-sm" {...props} />,
  pre: ({ node, ...props }) => <pre className="bg-gray-800 p-3 rounded my-2 overflow-x-auto" {...props} />,
  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300 my-3" {...props} />,
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => <thead className="bg-gray-800" {...props} />,
  tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-700 bg-gray-900/50" {...props} />,
  tr: ({ node, ...props }) => <tr className="transition-colors hover:bg-gray-800/50" {...props} />,
  th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" {...props} />,
  td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap" {...props} />,
}
// Compact Dark
const markdownComponentsCompact: Components = {
  ...markdownComponents,
  h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-white mb-3" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-white mb-2" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-base font-semibold text-white mb-2" {...props} />,
  p: ({ node, ...props }) => <p className="text-gray-100 mb-2 leading-relaxed" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-100 mb-2 space-y-1 ml-2" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-100 mb-2 space-y-1 ml-2" {...props} />,
  li: ({ node, ...props }) => <li className="text-gray-100" {...props} />,
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-3 rounded border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700 text-xs" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => <th className="px-3 py-2 text-left font-medium text-gray-300 bg-gray-800" {...props} />,
  td: ({ node, ...props }) => <td className="px-3 py-2 text-gray-300" {...props} />,
}
// Inverted (Light Background / Dark Text)
const markdownComponentsInverted: Components = {
  ...markdownComponents,
  h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mb-4" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-gray-900 mb-3 mt-6" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4" {...props} />,
  p: ({ node, ...props }) => <p className="text-gray-800 mb-3 leading-relaxed" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
  em: ({ node, ...props }) => <em className="italic text-gray-600" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-800 mb-3 space-y-1" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-800 mb-3 space-y-1" {...props} />,
  li: ({ node, ...props }) => <li className="text-gray-800 ml-4" {...props} />,
  code: ({ node, ...props }) => <code className="bg-gray-100 px-2 py-1 rounded text-blue-700 text-sm" {...props} />,
  pre: ({ node, ...props }) => <pre className="bg-gray-100 p-3 rounded my-2 overflow-x-auto border border-gray-200" {...props} />,
  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-3" {...props} />,
  
  // Light Tables
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
  tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-200 bg-white" {...props} />,
  tr: ({ node, ...props }) => <tr className="transition-colors hover:bg-gray-50" {...props} />,
  th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />,
  td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap" {...props} />,
}
// Compact Inverted
const markdownComponentsCompactInverted: Components = {
  ...markdownComponentsInverted,
  h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-gray-900 mb-3" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-gray-900 mb-2" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-base font-semibold text-gray-800 mb-2" {...props} />,
  p: ({ node, ...props }) => <p className="text-gray-800 mb-2 leading-relaxed" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-800 mb-2 space-y-1 ml-2" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-800 mb-2 space-y-1 ml-2" {...props} />,
  li: ({ node, ...props }) => <li className="text-gray-800" {...props} />,
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-3 rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-xs" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => <th className="px-3 py-2 text-left font-medium text-gray-600 bg-gray-50" {...props} />,
  td: ({ node, ...props }) => <td className="px-3 py-2 text-gray-700" {...props} />,
}