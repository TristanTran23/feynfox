import Anthropic from '@anthropic-ai/sdk'

import { supabase } from './supabase'

export const anthropic = new Anthropic({
  apiKey: process.env.VITE_CLAUDE,
  dangerouslyAllowBrowser: true, // Only use this in a controlled, safe environment
})

// Function to fetch data from the 'Content' table in Supabase
export const fetchContentData = async () => {
  try {
    const { data, error } = await supabase.from('Content').select('*') // Select all content

    if (error) {
      throw new Error(error.message)
    }

    // Assuming content is an array of rows, join them into a single string
    const contentText = data.map((row: any) => row.content_column).join('\n') // Replace 'content_column' with the actual column name

    return contentText
  } catch (error) {
    console.error('Error fetching content:', error)
    return null
  }
}

// Function to create the Claude API call with data from Supabase
export const generateTopics = async () => {
  try {
    // Step 1: Fetch content from Supabase
    const promptContent = await fetchContentData()
    // const promptContent =
    //   "The Moon, Earth's only natural satellite, is a rocky celestial body that orbits our planet at an average distance of about 238,855 miles. It plays a vital role in influencing Earth's tides due to its gravitational pull. The Moon's surface is covered with craters, formed by impacts from asteroids and comets, and vast plains of ancient volcanic rock. Despite being airless and barren, the Moon has inspired scientific exploration and cultural fascination for centuries, culminating in the Apollo missions, which saw humans set foot on its surface for the first time in 1969."
    // console.log('promptContent: ', promptContent)

    if (!promptContent) {
      throw new Error('No content fetched from Supabase')
    }

    // Step 3: Create a message for Claude API
    const msg = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      temperature: 0,
      system:
        'Generate a concise list of topics based on the provided content. Only return the topics, no additional explanation or details.',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Using the following content, create a list of at most 10 topics and only give me the topics:\n${promptContent}`,
            },
          ],
        },
      ],
    })

    // Log the response from Claude API
    console.log('Claude response:', msg)
    return msg
  } catch (error) {
    console.error('Error generating topics:', error)
  }
}

// Function to compare user input with the fetched content
export const generateRightAndWrong = async (userPrompt: string) => {
  try {
    // Step 1: Fetch content from Supabase
    const promptContent = await fetchContentData()
    // const promptContent =
    //   "The Moon, Earth's only natural satellite, is a rocky celestial body that orbits our planet at an average distance of about 238,855 miles. It plays a vital role in influencing Earth's tides due to its gravitational pull. The Moon's surface is covered with craters, formed by impacts from asteroids and comets, and vast plains of ancient volcanic rock. Despite being airless and barren, the Moon has inspired scientific exploration and cultural fascination for centuries, culminating in the Apollo missions, which saw humans set foot on its surface for the first time in 1969."
    console.log('promptContent: ', promptContent)

    userPrompt = 'The moon is very far away from the Earth.'

    if (!promptContent) {
      throw new Error('No content fetched from Supabase')
    }

    // Step 3: Create a message for Claude API
    const msg = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      temperature: 0,
      system:
        'I am helping users learn by providing accurate educational content. The document "promptContent" contains all the correct information, and the user will input their own document ("userPrompt"). Compare the userPrompt to the promptContent and generate the following three things:\n' +
        '1. A score out of 100 based on how closely the userPrompt aligns with the promptContent.\n' +
        '2. A short paragraph explaining what information in the userPrompt matches the promptContent.\n' +
        '3. A short paragraph explaining what information in the userPrompt does not match the promptContent. The goal is to compare both documents and highlight what the user got right and wrong.',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Take the following content and compare the user inputted text to the educational content. Create a score out of 100 based on how well the user inputted text aligns with the educational content.\n\nEducation content: \n${promptContent}\n\nUser inputted text: \n${userPrompt}`,
            },
          ],
        },
      ],
    })

    // Log the response from Claude API
    console.log('Claude response:', msg)
    return msg
  } catch (error) {
    console.error('Error generating comparison:', error)
  }
}
