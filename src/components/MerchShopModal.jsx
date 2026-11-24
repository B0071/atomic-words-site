import { useEffect, useState } from 'react'
import { siteContent } from '../data/siteContent'

export default function MerchShopModal({ isOpen, onClose }) {
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState({})
  const [checkedOut, setCheckedOut] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const items = siteContent.merchItems || []
  const categories = ['All', ...new Set(items.map((item) => item.category).filter(Boolean))]
  const filtered =
    category === 'All'
      ? items
      : items.filter((item) => item.category === category)

  const addItem = (id) => {
    setCheckedOut(false)
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const updateQty = (id, delta) => {
    setCheckedOut(false)
    setCart((prev) => {
      const nextQty = (prev[id] || 0) + delta
      if (nextQty <= 0) {
        const copy = { ...prev }
        delete copy[id]
        return copy
      }
      return { ...prev, [id]: nextQty }
    })
  }

  const totalCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + (cart[item.id] || 0) * Number(item.price || 0),
    0
  )

  return (
    <div
      className="modal-backdrop open"
      id="merchShopModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="merchModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <span className="eyebrow-tag">■ STUDIO SHOP // 10 ITEMS</span>
            <h2 id="merchModalTitle" style={{ marginTop: 6 }}>
              Atomic Words Physical Goods
            </h2>
          </div>
          <button
            type="button"
            className="btn-pill"
            id="closeMerchShopBtn"
            onClick={() => onClose?.()}
            aria-label="Close merch shop"
          >
            ✕ Close
          </button>
        </div>

        <div className="pill-row" style={{ marginTop: 14 }} role="group" aria-label="Filter merch by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`pill-tab ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: 18 }}>
          {filtered.map((item) => {
            const qty = cart[item.id] || 0
            return (
              <div key={item.id} className="card-flat">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 8,
                  }}
                >
                  <span className="mono-label">{item.category}</span>
                  <strong>${Number(item.price).toFixed(2)}</strong>
                </div>
                <h3 style={{ marginTop: 6, fontSize: '1.05rem' }}>{item.name}</h3>
                <p className="muted-copy" style={{ marginTop: 4, fontSize: '0.88rem' }}>
                  {item.note}
                </p>

                <div
                  style={{
                    marginTop: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  {qty === 0 ? (
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={() => addItem(item.id)}
                    >
                      Add to bag
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn-pill"
                        onClick={() => updateQty(item.id, -1)}
                        aria-label={`Decrease quantity for ${item.name}`}
                      >
                        −
                      </button>
                      <span className="mono-label">{qty}</span>
                      <button
                        type="button"
                        className="btn-pill"
                        onClick={() => updateQty(item.id, 1)}
                        aria-label={`Increase quantity for ${item.name}`}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="modal-footer">
          <div className="mono-label" aria-live="polite">
            BAG: {totalCount} {totalCount === 1 ? 'item' : 'items'} · $
            {totalPrice.toFixed(2)}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {checkedOut && (
              <span className="mono-label" aria-live="polite">
                ✓ Mock order queued ({totalCount} items).
              </span>
            )}
            <button
              type="button"
              className="btn-solid"
              disabled={totalCount === 0}
              onClick={() => setCheckedOut(true)}
            >
              Reserve Studio Order →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
