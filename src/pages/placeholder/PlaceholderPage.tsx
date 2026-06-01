import { PagePlaceholder } from '@/components/layout/PagePlaceholder'

type PlaceholderPageProps = {
  title: string
}

function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <PagePlaceholder
      title={title}
      description={`${title} will be built after the Overview dashboard foundation is finalized.`}
    />
  )
}

export default PlaceholderPage
