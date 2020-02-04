var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/vmSocks-green.jpg',
        link: 'https://www.hackerrank.com/challenges/30-data-types/problem',
        inventory: 0,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2232,
                variantColor: "green"
            },
            {
                variantId: 2233,
                variantColor: "blue"
            }
        ]
    }
})