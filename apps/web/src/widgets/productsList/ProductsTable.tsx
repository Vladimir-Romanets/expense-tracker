import { Table, Typography } from '@/shared/ui'
import { CategoryBadge, type ProductEntity } from '@/features/products'
import { ProductsTableHeader } from '@/features/products'
import { RowCheckbox } from './RowCheckbox'

interface Props {
  products: ProductEntity[]
}
const defaultValue = { id: 'name', value: 'asc' as 'asc' }
const headerOptions = [
  { id: 'checkbox', label: '' },
  { id: 'name', label: 'Product Name', enabled: true },
  { id: 'category', label: 'Category', enabled: true },
]

export const ProductsTable = ({ products }: Props) => {
  return (
    <Table>
      <Table.Header>
        <ProductsTableHeader
          options={headerOptions}
          defaultValue={defaultValue}
        />
      </Table.Header>
      <Table.Body>
        {products.length ? (
          products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell width="52px">
                <RowCheckbox productId={product.id} />
              </Table.Cell>
              <Table.Cell width="50%">{product.name}</Table.Cell>
              <Table.Cell>
                {product.categoryName ? (
                  <CategoryBadge name={product.categoryName} />
                ) : (
                  <span className="leading-7 text-slate-400">No Category</span>
                )}
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={3}>
              <Typography
                variant="p"
                className="text-center"
              >
                No products found.
              </Typography>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}
