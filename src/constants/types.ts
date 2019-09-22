enum AttributeType {
  N = 'N',
  S = 'S',
  B = 'B'
}

interface AttributeDefinition {
  AttributeName: string
  AttributeType: AttributeType
}

export { AttributeDefinition }
