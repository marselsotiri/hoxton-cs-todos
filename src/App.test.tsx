import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App, { addTodo, removeTodo } from "./App";

// What is a todo?
type Todo = {
    id: number
    title: string
}

const todos: Todo[] = [
    {
        id: 1,
        title: 'Learn Testing'
    },
    {
        id: 2,
        title: 'Do the project'
    }]


describe('addTodo', () => {
    it('add a new Todo', () => {
        const result = addTodo(todos, 'new todo')
        expect(result).toMatchObject([
            {
                id: 1,
                title: 'Learn Testing'
            },
            {
                id: 2,
                title: 'Do the project'
            },
            {
                id: 3,
                title: 'new todo'
            }])
    })
})



describe('removeTodo', () => {
    it('removes a  Todo from TodoList if it exists', () => {
        const result = removeTodo(todos, 1)
        expect(result).toMatchObject([
            {
                id: 2,
                title: 'Do the project'
            }
        ])
    })

    it('returns the same todos if id does not exist', () => {
        const result = removeTodo(todos, 12345)
        expect(result).toMatchObject(
            [
                {
                    id: 1,
                    title: 'Learn Testing'
                },
                {
                    id: 2,
                    title: 'Do the project'
                }
            ])
    })
})


describe('App', () => {

    it('add a new todo when Add Todo button is clicked', () => {
        render(<App />)

        const addButton = screen.getByText('ADD TODO')
        fireEvent.click(addButton)
        const display = screen.getByTestId('todo-1')
        expect(display.textContent).toContain('New todo, yay!')
    })

})