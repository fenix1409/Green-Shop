import React, { useContext, useState } from 'react'
import Modal from './Modal'
import { File } from '@/public/icons/Icons'
import { instance } from '@/hook/instance'
import { Context } from '@/context/AuthContext'
import Button from './Button'

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ProductCreate {
  category_id: string;
  cost: number;
  count: number;
  discount: number;
  product_description: string;
  product_name: string;
  product_status: string;
  short_description: string;
  size: string[];
  tags: string[];
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const { token } = useContext(Context)

  const [size, setSize] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const [origName, setOrigName] = useState<string>("");

  const [cost, setCost] = useState<number | null>(null)
  const [count, setCount] = useState<number | null>(null)
  const [discount, setDiscount] = useState<number | null>(null)
  const [sizes, setSizes] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [productName, setProductName] = useState<string>("")
  const [productDescription, setProductDescription] = useState<string>("")
  const [shortDescription, setShortDescription] = useState<string>("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [productStatus, setProductStatus] = useState<string>("")

  // image part 
  function handleChooseFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files
    if (file && file[0]) {
      setSize(file[0].size)
      setUrl(file[0].type)
      setOrigName(file[0].name)
    }
  }
  // image part 

  // create part 
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newProduct: ProductCreate = {
      category_id: categoryId,
      cost: cost!,
      count: count!,
      discount: discount!,
      product_description: productDescription,
      product_name: productName,
      product_status: productStatus,
      short_description: shortDescription,
      size: sizes,
      tags: tags,
    }
    instance().post(`/product`, newProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then(res => {
      // onClose()
      console.log(res);

    }).catch((error) => {
      console.error("Error creating product:", error)
    })
  }
  // create part 

  return (
    <Modal isOpen={isOpen} setIsOpen={onClose} width={700}>
      <form className='space-y-5 flex flex-col' onSubmit={handleSubmit}>
        <label className="flex items-center justify-center cursor-pointer">
          <File />
          <input type="file" className="hidden" onChange={handleChooseFile} />
          <span className="text-[#0EB182]">{origName || "Upload image"}</span>
        </label>
        <input className='w-full' type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        <textarea placeholder="Product Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required />
        <textarea placeholder="Short Description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />
        <input className='w-full' type="number" placeholder="Cost" value={cost || ''} onChange={(e) => setCost(Number(e.target.value))} required />
        <input className='w-full' type="number" placeholder="Count" value={count || ''} onChange={(e) => setCount(Number(e.target.value))} required />
        <input className='w-full' type="number" placeholder="Discount" value={discount || ''} onChange={(e) => setDiscount(Number(e.target.value))} required />
        <input className='w-full' type="text" placeholder="Category ID" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
        <input className='w-full' type="text" placeholder="Product Status" value={productStatus} onChange={(e) => setProductStatus(e.target.value)} />
        <input className='w-full' type="text" placeholder="Sizes (comma separated)" value={sizes.join(', ')} onChange={(e) => setSizes(e.target.value.split(',').map(s => s.trim()))} required />
        <input className='w-full' type="text" placeholder="Tags (comma separated)" value={tags.join(', ')} onChange={(e) => setTags(e.target.value.split(',').map(t => t.trim()))} required />
        <Button title='Create Product' type="submit" extraStyle='!w-full' />
      </form>
    </Modal>
  )
}

export default CreateModal