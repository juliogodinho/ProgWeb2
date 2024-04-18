telegram bot name: ProgWeb2
sentences that start with npm and npx are terminal commands

create file with with name .env with text:
TOKEN=putbottokenhere
DATABASE_URL="file:./dev.db"

npm run dev
npm install dot env --save
npm install typescript --dev
npx tsc
npx tsc --init
on file tsconfig.json add:  
    "rootDir": "./src",
    "outDir": "./build",
npm install --save-dev @types/node-telegram-bot-api
install extensions:
    prisma insider
    SQLite Viewer
    Code Runner
copy all code on schema.prisma
delete folder prisma
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
paste code copied on schema.prisma before prisma folder deletion, on the new schema.prisma file
save schema.prisma
npx prisma migrate dev --name init
to access prisma database use comand:
    npx prisma studio
    press ctrl+C to exit prisma studio
to run the telegram bot:
    npx tsc
    open file TelegramBot.js
    click on run code on the top right. To stop running code press stop buttom.

