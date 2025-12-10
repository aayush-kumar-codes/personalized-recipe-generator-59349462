import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/App'; // Adjust the path as necessary
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/server'; // Adjust the path as necessary

// Unit Test for React Component
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Integration Test for API
describe('API Integration Tests', () => {
  let db;
  let client;

  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db('testdb');
  });

  afterAll(async () => {
    await client.close();
    await mongoose.connection.close();
  });

  test('GET /api/items returns items', async () => {
    const response = await request(app).get('/api/items');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/items creates an item', async () => {
    const newItem = { name: 'Test Item', description: 'This is a test item' };
    const response = await request(app).post('/api/items').send(newItem);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newItem.name);
  });
});

// User Acceptance Test
test('User can add an item', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/add item/i));
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Item' } });
  fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Item Description' } });
  fireEvent.click(screen.getByText(/submit/i));
  
  const successMessage = await screen.findByText(/item added successfully/i);
  expect(successMessage).toBeInTheDocument();
});