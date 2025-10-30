-- AlterTable
CREATE SEQUENCE usuario_id_seq;
ALTER TABLE "usuario" ALTER COLUMN "id" SET DEFAULT nextval('usuario_id_seq');
ALTER SEQUENCE usuario_id_seq OWNED BY "usuario"."id";
