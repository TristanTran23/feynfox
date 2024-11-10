import React, { useState } from 'react'

import { generateRightAndWrong, generateTopics } from '@/utils/claude'

const TestingFile: React.FC = () => {
  const [topicsResponse, setTopicsResponse] = useState<string | null>(null)
  const [rightAndWrongResponse, setRightAndWrongResponse] = useState<
    string | null
  >(null)
  const [userPrompt, setUserPrompt] = useState<string>(
    'This is a sample user input to test.',
  )

  // Example prompt content (simulating the content fetched from Supabase)
  const exampleContent = `
    Education content: The Earth orbits around the Sun. Gravity keeps the planets in orbit. 
    The Sun is a star at the center of our solar system.
  `

  const handleGenerateTopics = async () => {
    try {
      const result = await generateTopics() // Assuming this function will log internally
      setTopicsResponse(JSON.parse(result)) // Update state with response for display
    } catch (error) {
      console.error('Error generating topics:', error)
    }
  }

  const handleGenerateRightAndWrong = async () => {
    try {
      const result = await generateRightAndWrong(userPrompt) // Assuming this function will log internally
      setRightAndWrongResponse(JSON.stringify(result, null, 2)) // Update state with response for display
    } catch (error) {
      console.error('Error generating right and wrong comparison:', error)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Testing File</h1>

      {/* Buttons to trigger the methods */}
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleGenerateTopics}>
          Generate Topics
        </button>
        <button style={styles.button} onClick={handleGenerateRightAndWrong}>
          Generate Right and Wrong Comparison
        </button>
      </div>

      {/* Displaying the responses */}
      <div style={styles.responseContainer}>
        <h2 style={styles.subTitle}>Topics Response</h2>
        <pre style={styles.pre}>{topicsResponse}</pre>

        <h2 style={styles.subTitle}>Right and Wrong Response</h2>
        <pre style={styles.pre}>{rightAndWrongResponse}</pre>
      </div>

      {/* Optional: Input field for user prompt */}
      <h3 style={styles.inputTitle}>Enter Custom User Prompt:</h3>
      <textarea
        style={styles.textarea}
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Enter user prompt text here"
        rows={5}
        cols={50}
      />
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  responseContainer: {
    marginBottom: '20px',
  },
  subTitle: {
    color: '#555',
  },
  pre: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '5px',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontFamily: 'Courier, monospace',
    fontSize: '14px',
  },
  inputTitle: {
    marginTop: '30px',
    fontSize: '18px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'vertical',
  },
}

export default TestingFile
