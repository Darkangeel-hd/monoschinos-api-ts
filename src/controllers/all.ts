import { Controller } from '../types'
import { get, parse, attr, api } from '../api'

export const getAll: Controller = async (req, res) => {
  try {
    const { page = '1' } = req.query
    const { data } = await get(api.all(page))
    const html = parse(data)
    res.status(200).json(
      html.querySelectorAll('.heromain .row .col-md-4.col-lg-2.col-6').map(i => {
        return {
          id: attr(i, 'a', 'href').split('/').pop() || null,
          title: i.querySelector('.seristitles')?.text.trim() || null,
          image: attr(i, '.animemainimg', 'src') || null,
        }
      })
    )
  } catch (error) {
    res.status(500).json({ error })
  }
}
