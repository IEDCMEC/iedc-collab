import React from 'react'

export const InternshipContext = React.createContext()

export const InternshipProvider = InternshipContext.Provider
export const InternshipConsumer = InternshipContext.Consumer

export default InternshipContext