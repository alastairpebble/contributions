export const data = {
  personas: [
    {
      id: 1,
      name: {
        first: "Alastair",
        last: "Driver"
      },
      pensions: {
        person: {
          ages: {
            now: 30,
            retirement: 65,
            until: 91
          },
          income: {
            salary: {
              annual: {
                current: 30000,
                inflation: 30000
              }
            }
          },
          gender: "M"
        },
        rates: {
          government: {
            inflation: -0.028
          },
          pension: {
            interest: 0.04,
            fees: {
              annual: -0.0075
            }
          }
        },
        pot: {
          now: {
            contributions: {
              personal: 0.04,
              employer: 0.04,
              amount: {
                personal: 0,
                employer: 0
              }
            },
            amount: 0
          },
          future: {
            contributions: {
              personal: 0.05,
              employer: 0.05,
              amount: {
                personal: 0,
                employer: 0
              }
            },
            amount: 0
          },
          superfuture: {
            contributions: {
              personal: 0.06,
              employer: 0.05,
              amount: {
                personal: 0,
                employer: 0
              }
            },
            amount: 0
          },
          display: {
            amount: 0
          }
        },
        contributions: {
          personal: {
            percentage: 5
          },
          employer: {
            percentage: 4
          }
        }
      }
    }
  ]
};
