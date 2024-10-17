export interface ArticleResponse {
  data: {
    attributes: Article
  }
  meta: Meta
}

export interface Data<T extends unknown> {
  data: {
    id: number
    attributes: T
  }
}

export interface Article {
  name: string
  description: Description[]
  year: number
  status: string
  min_price: number
  max_price: number
  avg_price: number
  vin: string
  lot_number: string
  total_sum: number
  fuel_type: string
  body_type: string
  engine: string
  milage: string
  transmission: string
  color: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  cover: Image
  images: Data<Data<Image[]>>[];
  car_model: Data<CarModel>
  city: Data<City>
}

export interface Description {
  type: string
  children: Children[]
}

export interface Children {
  type: string
  text: string
}

export interface Image {
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
}

export interface Formats {
  thumbnail: Format
  small: Format
  medium: Format
  large: Format
}

export interface Format {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface CarModel {
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  manufactor: Data<{
    name: string
  }>
}

export interface City {
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  country: Data<{
    name: string;
    code: string;
  }>
}

export interface Country {
  data: Array<{
    attributes: {
      "name": string,
      "code": string,
      "delivery": string,
      "cities": {
        "data": Data<City>[]
      }
    }
  }>
}

export interface Meta { }
