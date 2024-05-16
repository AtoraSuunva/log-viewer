export class SizedMap<K, V> extends Map<K, V> {
  private keyOrder: K[] = []

  constructor(private maxSize: number) {
    super()
  }

  override set(key: K, value: V): this {
    if (this.maxSize <= this.size && !this.has(key)) {
      // We're at or above maxSize, and the key to insert is not already in the map
      // We need to delete something to make space
      const keyToDelete = this.keyOrder.pop()
      if (keyToDelete) {
        this.delete(keyToDelete)
      }
    }

    if (!this.has(key)) {
      // If the key is not already in the map, add it to the keyOrder
      this.keyOrder.unshift(key)
    }

    return super.set(key, value)
  }

  override delete(key: K): boolean {
    const deleted = super.delete(key)

    if (deleted) {
      this.keyOrder = this.keyOrder.filter((k) => k !== key)
    }

    return deleted
  }

  override clear(): void {
    super.clear()
    this.keyOrder = []
  }
}
