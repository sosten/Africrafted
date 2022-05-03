import bcrypt from 'bcrypt'

const data = {
    // users: [
    //     {
    //         firstName: 'Joseph',
    //         lastName: 'Banda',
    //         email: 'josephbanda@yahoo.com',
    //         password: bcrypt.hashSync(12345678),
    //         isAdmin: true
    //     },
    //     {
    //         firstName: 'musonda',
    //         lastName: 'musonda',
    //         email: 'musondamusonda@gmail.com',
    //         password: bcrypt.hashSync(12345678),
    //         isAdmin: false
    //     }
    // ],

    products: [
        {
            // _id: '1',
            slug: 'product_1',
            artistName: 'ArtonlineGallery',
            productName: 'beads',
            description: 'Portrait painting custom from photo hand painted oil paints canvas child family portrait wedding commission painting',
            image: '/images/carved_7.jpg',
            category: 'neckleses',
            rating: 1.5,
            numReviews: 133,
            price: 100.99,
            countInStock: 4
        },
        {
            // _id: '2',
            artistName: 'John Banda',
            slug: 'product_2',
            productName: ' A girl with a smile',
            description: 'Portrait painting custom from photo hand painted oil paints canvas child family portrait wedding commission painting',
            image: '/images/oil_art_1.jpg',
            category: 'painting',
            rating: 4.5,
            numReviews: 110,
            price: 500,
            countInStock: 24
        },
        {
            // _id: '3',
            artistName: 'Anna Media',
            slug: 'product_3',
            productName: 'celebration',
            description: 'People are having fun, painting done in oil paint',
            image: '/images/oil_art_2.jpg',
            category: 'painting',
            rating: 1.5,
            numReviews: 30,
            price: 163,
            countInStock: 0
        },
        {
            // _id: '4',
            artistName: 'ZedmediaArt',
            slug: 'product_4',
            productName: 'Wall Dedcor',
            description: 'Portrait painting custom from photo hand painted oil paints canvas child family portrait wedding commission painting',
            image: '/images/decor_1.webp',
            category: 'Craving',
            rating: 2.5,
            numReviews: 2453,
            price: 220,
            countInStock: 14
        },
        {
            // _id: '5',
            artistName: 'Annah White',
            slug: 'product_5',
            productName: 'Hand Bag',
            description: 'Hand Bag made of wax chitenje material',
            image: '/images/bag_1.webp',
            category: 'bags_&_purses',
            rating: 1.5,
            numReviews: 17,
            price: 137,
            countInStock: 21
        },
    ]
}

export default data;