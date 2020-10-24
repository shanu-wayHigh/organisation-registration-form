import React, { useContext } from 'react'
import { CompanyDetailsContext } from '../../pages/CompanyDetails/context'
import './styles.scss'

function ImageUpload(props: any) {
  const { formData, setFormData } = useContext(CompanyDetailsContext as any)

  const [imageUrl, setImageUrl] = React.useState(
    'http://placehold.jp/150x150.png'
  )

  const handleChange = (event: any) => {
    const { name, files } = event.target
    let reader = new FileReader()
    let file = files[0]

    reader.onloadend = () => {
      setImageUrl(reader.result as any)
    }
    reader.readAsDataURL(file)
    setFormData({ ...formData, [name]: reader.result })
  }

  return (
    <div className="flex-row">
      <img className="image-round" src={imageUrl} alt="" />
      <label htmlFor="my-image" className="upload-image">
        Upload your company logo
      </label>
      <input
        type="file"
        name="myImage"
        id="my-image"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </div>
  )
}

export default ImageUpload
