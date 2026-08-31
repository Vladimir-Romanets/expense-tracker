import { Table } from '@/shared/ui'

const skeletonRows = Array.from({ length: 2 })

const ReceiptsLoader = () => (
  <Table className="animate-pulse">
    <Table.Header>
      <Table.Row>
        <Table.Head>Date</Table.Head>
        <Table.Head>Store Name</Table.Head>
        <Table.Head>Total Amount</Table.Head>
        <Table.Head>Receipt Scan</Table.Head>
        <Table.Head>Actions</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {skeletonRows.map((_, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <div className="h-4 w-24 rounded bg-slate-200" />
          </Table.Cell>
          <Table.Cell>
            <div className="h-4 w-32 rounded bg-slate-200" />
          </Table.Cell>
          <Table.Cell>
            <div className="h-4 w-16 rounded bg-slate-200" />
          </Table.Cell>
          <Table.Cell>
            <div className="size-10 rounded border border-slate-300 bg-slate-100" />
          </Table.Cell>
          <Table.Cell>
            <div className="flex items-center gap-3">
              <div className="size-8 rounded bg-slate-200" />
              <div className="size-8 rounded bg-slate-200" />
            </div>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default ReceiptsLoader
