Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:`
    <div class="product">
    <div class="product-image">
        <img v-bind:src="image" height="200px" alt="">
    </div>
    <div class="product-info">
        <h4>{{ title }}</h4>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out!</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div v-for="(variant, index) in variants" :key="variant.variantId" 
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)">
        </div>

        <button class="btn-sm btn-primary" v-on:click="addToCart">Add to Cart</button>
    </div>
</div>
<product-tabs></product-tabs>
`,

data () {
    return {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        link: 'https://www.hackerrank.com/challenges/30-data-types/problem',
        inventory: 0,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2232,
                variantColor: "green",
                variantImage: './assets/vmSocks-green.jpg'
            },
            {
                variantId: 2233,
                variantColor: "blue",
                variantImage: './assets/vmSocks-blue.jpg',
                variantQuantity: 0
            }
        ],

        reviews: []
    }
},

    methods:{
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },

        updateProduct(index) {
            this.selectedVariant = index
        },
        
        addReview (productReview) {
            this.reviews.push(productReview)
        }
    },
    

    computed: {
        title () {
            return this.brand + ' ' + this.product
        },

        image () {
            return this.variants[this.selectedVariant].variantImage
        },

        inStock () {
            return this.variants[this.selectedVariant].variantQuantity
        },

        shipping () {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }

})


Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">

            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name">
            </p>
                
            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>


            <p>
                <input type="submit" value="Submit">
            </p>

        </form>
    `,

    data () {
        return {
            name: null,
            review: null,
            rating: null
        }
    },

    methods: {
        onSubmit () {
            let productReview = {
                name: this.name, 
                review: this.review,
                rating: this.rating
            }

            this.$emit('review-submitted', productReview)
            this.name = null,
            this.review = null,
            this.rating = null
        }
    }

})


Vue.component('product-tabs', {
template: `
    <div>
        <span class="tab" v-for="(tab, index) in tabs" :key="index">{{ tab }}</span>
    </div>
`,

data () {
    return {
        tabs: ['Reviews', 'Make a Review']
    }
}

})

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart (id) {
            this.cart.push(id)
        }
    }
})

// Vue.component('Product', {
//     template: `
//         <div>
//             <h1>I am a component</h1>
//             <h2>Beautiful me</h2>
//         </div>
//       `
// })