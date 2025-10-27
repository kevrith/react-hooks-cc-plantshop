import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

describe('2nd Deliverable', () => {
    test('adds a new plant when the form is submitted', async () => {
        global.setFetchResponse(global.basePlants)
        const { findByPlaceholderText, findByText, getByText } = render(<App />)

        // Wait for plants to load and form to appear
        await findByPlaceholderText('Plant name')

        const firstPlant = {name: 'foo', image: 'foo_plant_image_url', price: '10'}

        global.setFetchResponse(firstPlant)

        fireEvent.change(await findByPlaceholderText('Plant name'), { target: { value: firstPlant.name } });
        fireEvent.change(await findByPlaceholderText('Image URL'), { target: { value: firstPlant.image } });
        fireEvent.change(await findByPlaceholderText('Price'), { target: { value: firstPlant.price } });
        fireEvent.click(getByText('Add Plant'))

        expect(fetch).toHaveBeenCalledWith("http://localhost:6001/plants", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...firstPlant, inStock: true }),
        })

        const newPlant = await findByText('foo');
        expect(newPlant).toBeInTheDocument();

        const secondPlant = {name: 'bar', image: 'bar_plant_image_url', price: '5'}

        global.setFetchResponse(secondPlant)

        fireEvent.change(await findByPlaceholderText('Plant name'), { target: { value: secondPlant.name } });
        fireEvent.change(await findByPlaceholderText('Image URL'), { target: { value: secondPlant.image } });
        fireEvent.change(await findByPlaceholderText('Price'), { target: { value: secondPlant.price } });
        fireEvent.click(getByText('Add Plant'))

        expect(fetch).toHaveBeenCalledWith("http://localhost:6001/plants", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...secondPlant, inStock: true }),
        })

        const nextPlant = await findByText('bar');
        expect(nextPlant).toBeInTheDocument();
    });
})
