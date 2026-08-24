import { Table } from '@/ui'
import { RowCheckbox } from './RowCheckbox'
import { CategoryBadge } from '../ui/CategoryBadge'
import type { ProductEntity } from '../../types'

interface Props {
  products: ProductEntity[]
}

export const ProductsTable = ({ products }: Props) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head></Table.Head>
          <Table.Head>Product Name</Table.Head>
          <Table.Head>Category</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {products.map((product) => (
          <Table.Row key={product.id}>
            <Table.Cell>
              <RowCheckbox productId={product.id} />
            </Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>
              {product.categoryName ? (
                <CategoryBadge name={product.categoryName} />
              ) : (
                <span className="text-slate-400">No Category</span>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
