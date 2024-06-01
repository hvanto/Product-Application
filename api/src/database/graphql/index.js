
const { gql } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const db = require("../database");


const pubsub = new PubSub();

const typeDefs = gql`

    type User {
        userId: ID!
        username: String!
        email: String!
        password_hash: String!
        cart: Cart
    }

    type Cart {
        cartId: ID!
        userId: ID!
        products: [Product]
    }

    type Product {
        productId: ID!
        productName: String!
        productDescription: String!
        price: Float!
    }

    type Review {
        reviewId: ID!
        userId: ID!
        productId: ID!
        content: String!
        rating: Int!
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        products: [Product]
        product(productId: ID!): Product
        reviews: [Review]
        review(reviewId: ID!): Review
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        updateUser(userId: ID!, username: String, email: String, password: String): User
        deleteUser(userId: ID!): User
        createProduct(productName: String!, productDescription: String!, price: Float!): Product
        updateProduct(productId: ID!, productName: String, productDescription: String, price: Float): Product
        deleteProduct(productId: ID!): Product
        createReview(userId: ID!, productId: ID!, content: String!, rating: Int!): Review
        updateReview(reviewId: ID!, content: String, rating: Int): Review
        deleteReview(reviewId: ID!): Review
    }

    type Subscription {
        userCreated: User
        userUpdated: User
        userDeleted: User
        productCreated: Product
        productUpdated: Product
        productDeleted: Product
        reviewCreated: Review
        reviewUpdated: Review
        reviewDeleted: Review
    }
`;

const resolvers = {
    Query: {
        users: async () => {
            return await db.user.findAll();
        },
        user: async (parent, args) => {
            return await db.user.findByPk(args.userId);
        },
        products: async () => {
            return await db.product.findAll();
        },
        product: async (parent, args) => {
            return await db.product.findByPk(args.productId);
        },
        reviews: async () => {
            return await db.review.findAll();
        },
        review: async (parent, args) => {
            return await db.review.findByPk(args.reviewId);
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await db.user.create(args);
            pubsub.publish("USER_CREATED", { userCreated: user });
            return user;
        },
        updateUser: async (parent, args) => {
            const user = await db.user.findByPk(args.userId);
            await user.update(args);
            pubsub.publish("USER_UPDATED", { userUpdated: user });
            return user;
        },
        deleteUser: async (parent, args) => {
            const user = await db.user.findByPk(args.userId);
            await user.destroy();
            pubsub.publish("USER_DELETED", { userDeleted: user });
            return user;
        },
        createProduct: async (parent, args) => {
            const product = await db.product.create(args);
            pubsub.publish("PRODUCT_CREATED", { productCreated: product });
            return product;
        },
        updateProduct: async (parent, args) => {
            const product = await db.product.findByPk(args.productId);
            await product.update(args);
            pubsub.publish("PRODUCT_UPDATED", { productUpdated: product });
            return product;
        },
        deleteProduct: async (parent, args) => {
            const product = await db.product.findByPk(args.productId);
            await product.destroy();
            pubsub.publish("PRODUCT_DELETED", { productDeleted: product });
            return product;
        },
        createReview: async (parent, args) => {
            const review = await db.review.create(args);
            pubsub.publish("REVIEW_CREATED", { reviewCreated: review });
            return review;
        },
        updateReview: async (parent, args) => {
            const review = await db.review.findByPk(args.reviewId);
            await review.update(args);
            pubsub.publish("REVIEW_UPDATED", { reviewUpdated: review });
            return review;
        }
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterator(["USER_CREATED"])
        },
        userUpdated: {
            subscribe: () => pubsub.asyncIterator(["USER_UPDATED"])
        },
        userDeleted: {
            subscribe: () => pubsub.asyncIterator(["USER_DELETED"])
        },
        productCreated: {
            subscribe: () => pubsub.asyncIterator(["PRODUCT_CREATED"])
        },
        productUpdated: {
            subscribe: () => pubsub.asyncIterator(["PRODUCT_UPDATED"])
        },
        productDeleted: {
            subscribe: () => pubsub.asyncIterator(["PRODUCT_DELETED"])
        },
        reviewCreated: {
            subscribe: () => pubsub.asyncIterator(["REVIEW_CREATED"])
        },
        reviewUpdated: {
            subscribe: () => pubsub.asyncIterator(["REVIEW_UPDATED"])
        }
    }

};

