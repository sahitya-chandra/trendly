-- CreateTable
CREATE TABLE "Platform" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "platformId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeywordOccurrence" (
    "id" SERIAL NOT NULL,
    "keywordId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeywordOccurrence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Platform_name_key" ON "Platform"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Post_url_key" ON "Post"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_word_key" ON "Keyword"("word");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordOccurrence" ADD CONSTRAINT "KeywordOccurrence_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordOccurrence" ADD CONSTRAINT "KeywordOccurrence_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
