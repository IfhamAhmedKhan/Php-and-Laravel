import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "MongoDBAtlasIfham";
if (!uri) throw new Error("Please define the MONGODB_URI environment variable");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const usersCollection = db.collection("users");

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ 
      email: "ifham.khan105@gmail.com" 
    });

    if (existingAdmin) {
      return NextResponse.json({ 
        message: "Admin user already exists" 
      }, { status: 200 });
    }

    // For now, use a simple hash (we'll fix this later)
    const hashedPassword = "temp_hash_for_testing";

    // Create admin user
    const adminUser = {
      username: "ifham",
      email: "ifham.khan105@gmail.com",
      password: hashedPassword,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await usersCollection.insertOne(adminUser);

    return NextResponse.json({ 
      message: "Admin user created successfully",
      userId: result.insertedId
    }, { status: 201 });

  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
} 