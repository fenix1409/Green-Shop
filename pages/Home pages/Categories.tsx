import CategoryList from '@/components/CategoryList'
import ProductsList from '@/components/ProductsList'
import React from 'react'

const Categories = () => {
  return (
    <div className='flex items-center justify-between p-10'>
        <CategoryList/>
        <ProductsList/>
    </div>
  )
}

export default Categories