const BASE_URL = 'https://iglika.me'

export const fetchProducts = async (category) => {
  const endpoints = {
    'drinks-and-supplements': '/getProducts',
    cosmetics:                '/getProducts',
    drinks:                   '/getDrinks',
    supplements:              '/getSupplements',
    face:                     '/getFace',
    body:                     '/getBody',
    hygiene:                  '/getPersonalhygiene',
    'weight-loss':            '/getWeightcontrol',
    packages:                 '/getPackages',
    shop:                     '/getProducts',
  }

  const path = endpoints[category] || '/getProducts'
  try {
    const response = await fetch(`${BASE_URL}${path}`)
    let data = await response.json()

    if (category === 'cosmetics') {
      return data.filter(p =>
        ['Грижа за лицето', 'Грижа за тялото', 'Лична хигиена'].includes(p.category)
      )
    }
    if (category === 'drinks-and-supplements') {
      return data.filter(p => ['Напитки', 'Добавки'].includes(p.category))
    }
    return data
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}

export const getOrderUrl = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/getProductDetails/${productId}`)
    const data = await response.json()
    const baseUrl = 'https://foreverliving.com/shop/bgr/bg-BG/products/'
    const params  = '?fboId=359000029738&purchaseFlowType=PERSONAL&languageCode=bg-BG&memberTitleId=1&storeId=74&countryCode=bgr&isBots=true&discountConfigType=11&uniqueExtRefID=40a7b1c7-9e0a-4990-99a0-171666a9daf1&shortenUrl=thealoeveraco.shop/Bnfro9xY&referralUuid=13b64c34-4c13-47b5-ad58-d705df4824d5'
    return `${baseUrl}${data.forever_name}${params}`
  } catch (error) {
    console.error('Order URL error:', error)
    return '#'
  }
}