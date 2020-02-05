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

        <div v-for="(variant, index) in variants" 
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)">
        </div>

        <button class="btn-sm btn-primary" v-on:click="addToCart" :disabled="!inStock"
        :class="{ disabledButton: !inStock }">Add to Cart</button>

        <div class="cart">
            <p>Cart({{ cart }})</p>
        </div>
    </div>
</div>`,

data () {
    return {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        inStock: true,
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
                variantImage: './assets/vmSocks-blue.jpg'
            }
        ],

        cart: 0,
    }
},

    methods:{
        addToCart: function () {
            this.cart += 1
        },

        updateProduct(index) {
            this.selectedVariant = index
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



var app = new Vue({
    el: '#app',
    data: {
        premium: false
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