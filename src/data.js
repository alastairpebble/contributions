export const data = {
  personas: [
    {
      id: 1,
      name: {
        first: "FirstName",
        last: "LastName"
      },
      pensions: {
        person: {
          ages: {
            now: 30,
            retirement: 67,
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
              employer: 0.04
            },
            amount: 85050
          },
          future: {
            contributions: {
              personal: 0.05,
              employer: 0.05
            },
            amount: "0"
          },
          superfuture: {
            contributions: {
              personal: 0.06,
              employer: 0.05
            },
            amount: "0"
          },
          display: {
            amount: "85,050"
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
