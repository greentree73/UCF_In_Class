import { connectDB, closeDB } from './config/db';
import { Product } from './models';

// ============================================
// INTRODUCTION TO MONGOOSE
// ============================================
// TODO: Explain what Mongoose is and why we use it instead of the native MongoDB driver

const runMongooseDemo = async () => {
	// TODO: Explain what this function call does
	await connectDB();

	console.log('\n📦 Creating sample products...');

	// TODO: Explain what happens when we create a new Product instance
	const laptop = new Product({
		name: 'Gaming Laptop',
		description: 'High-performance laptop with RTX graphics card',
		price: 1299.99,
		category: 'Electronics',
		quantity: 15
	});

	// TODO: Explain what the .save() method does and when validation occurs
	await laptop.save();
	console.log('✅ Laptop saved:', laptop.name);

	// TODO: Explain the difference between new Product() + save() vs Product.create()
	const mouse = await Product.create({
		name: 'Wireless Mouse',
		description: 'Ergonomic wireless mouse with USB receiver',
		price: 29.99,
		category: 'Electronics',
		quantity: 50
	});
	console.log('✅ Mouse created:', mouse.name);

	const keyboard = await Product.create({
		name: 'Mechanical Keyboard',
		description: 'RGB mechanical keyboard with Cherry MX switches',
		price: 89.99,
		category: 'Electronics',
		quantity: 30
	});
	console.log('✅ Keyboard created:', keyboard.name);

	console.log('\n🔍 Querying products...');

	// TODO: Explain what Product.find() does and what it returns
	const allProducts = await Product.find();
	console.log(`Found ${allProducts.length} products`);

	// TODO: Explain what this query does and how the filter works
	const affordableProducts = await Product.find({ price: { $lt: 100 } });
	console.log(`\nProducts under $100: ${affordableProducts.length}`);
	affordableProducts.forEach(p => console.log(`  - ${p.name}: $${p.price}`));

	// TODO: Explain what findOne() does and how it differs from find()
	const expensiveProduct = await Product.findOne({ price: { $gte: 1000 } });
	if (expensiveProduct) {
		console.log(`\n💰 Most expensive: ${expensiveProduct.name} - $${expensiveProduct.price}`);
	}

	// TODO: Explain what findById() does and when you would use it
	const foundProduct = await Product.findById(laptop._id);
	if (foundProduct) {
		console.log(`\n🔎 Found by ID: ${foundProduct.name}`);
	}

	console.log('\n✨ Mongoose demo complete!');

	// TODO: Explain why we need to close the database connection
	await closeDB();
};

// TODO: Explain what this error handling does
runMongooseDemo().catch(error => {
	console.error('❌ Error:', error);
	process.exit(1);
});
