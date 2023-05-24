module.exports = {
    async headers() {
      return [
        {
          source: '/api/tile/:x*',
          headers: [
            {
              key: 'Content-Type',
              value: 'image/png',
            }
          ],
        },
        {
          source: '/api/data/:x*',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/json',
            }
          ],
        },
      ]
    },
}
