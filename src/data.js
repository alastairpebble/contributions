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
            current: 35,
            retirement: 67
          },
          income: {
            salary: {
              annual: {
                current: 20000,
                inflation: 20000
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
              personal: 0.05,
              employer: 0.05
            },
            amount: "106310"
          },
          future: {
            contributions: {
              personal: 0.06,
              employer: 0.05
            },
            amount: "0"
          },
          superfuture: {
            contributions: {
              personal: 0.07,
              employer: 0.05
            },
            amount: "0"
          },
          display: {
            amount: "106,310"
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
