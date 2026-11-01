import type { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialSchema1750000000000 implements MigrationInterface {
  name = 'InitialSchema1750000000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')
    await queryRunner.query(
      `CREATE TYPE "public"."document_category_enum" AS ENUM ('LEGAL', 'OFICIO_GOBIERNO', 'INFORME')`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."affiliate_status_enum" AS ENUM ('PENDING', 'REVIEWED', 'APPROVED')`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."admin_role_enum" AS ENUM ('ADMIN', 'EDITOR')`,
    )

    await queryRunner.query(`
      CREATE TABLE "documents" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "title" character varying(200) NOT NULL,
        "description" text NOT NULL,
        "category" "public"."document_category_enum" NOT NULL,
        "file_url" character varying(500) NOT NULL,
        "official_entity" character varying(200) NOT NULL,
        "seal_date" date NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_documents" PRIMARY KEY ("id")
      )
    `)
    await queryRunner.query(`CREATE INDEX "IDX_documents_category" ON "documents" ("category")`)

    await queryRunner.query(`
      CREATE TABLE "events" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "title" character varying(200) NOT NULL,
        "slug" character varying(180) NOT NULL,
        "description" text NOT NULL,
        "location" character varying(250) NOT NULL,
        "is_free" boolean NOT NULL DEFAULT true,
        "price" numeric(10,2),
        "event_date" TIMESTAMP WITH TIME ZONE NOT NULL,
        "capacity" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_events" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_events_slug" UNIQUE ("slug")
      )
    `)
    await queryRunner.query(`CREATE INDEX "IDX_events_event_date" ON "events" ("event_date")`)

    await queryRunner.query(`
      CREATE TABLE "affiliate_requests" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "full_name" character varying(150) NOT NULL,
        "email" character varying(200) NOT NULL,
        "phone" character varying(30) NOT NULL,
        "city" character varying(120) NOT NULL,
        "motivation" text NOT NULL,
        "status" "public"."affiliate_status_enum" NOT NULL DEFAULT 'PENDING',
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_affiliate_requests" PRIMARY KEY ("id")
      )
    `)
    await queryRunner.query(
      `CREATE INDEX "IDX_affiliate_requests_status" ON "affiliate_requests" ("status")`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_affiliate_requests_created_at" ON "affiliate_requests" ("created_at")`,
    )

    await queryRunner.query(`
      CREATE TABLE "social_projects" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "title" character varying(200) NOT NULL,
        "description" text NOT NULL,
        "before_image_url" character varying(500) NOT NULL,
        "after_image_url" character varying(500) NOT NULL,
        "impact_metrics" character varying(300) NOT NULL,
        "project_date" date NOT NULL,
        CONSTRAINT "PK_social_projects" PRIMARY KEY ("id")
      )
    `)
    await queryRunner.query(
      `CREATE INDEX "IDX_social_projects_project_date" ON "social_projects" ("project_date")`,
    )

    await queryRunner.query(`
      CREATE TABLE "books" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "title" character varying(200) NOT NULL,
        "synopsis" text NOT NULL,
        "price_digital" numeric(10,2) NOT NULL,
        "price_physical" numeric(10,2) NOT NULL,
        "preview_pdf_url" character varying(500) NOT NULL,
        "full_pdf_url" character varying(500) NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_books" PRIMARY KEY ("id")
      )
    `)

    await queryRunner.query(`
      CREATE TABLE "donation_settings" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "bank_name" character varying(120) NOT NULL,
        "account_holder" character varying(180) NOT NULL,
        "account_number_or_clabe" character varying(50) NOT NULL,
        "qr_image_url" character varying(500) NOT NULL,
        "is_active" boolean NOT NULL DEFAULT false,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_donation_settings" PRIMARY KEY ("id")
      )
    `)
    await queryRunner.query(
      `CREATE INDEX "IDX_donation_settings_is_active" ON "donation_settings" ("is_active")`,
    )

    await queryRunner.query(`
      CREATE TABLE "admin_users" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(150) NOT NULL,
        "email" character varying(200) NOT NULL,
        "password_hash" character varying(255) NOT NULL,
        "role" "public"."admin_role_enum" NOT NULL DEFAULT 'ADMIN',
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_admin_users" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_admin_users_email" UNIQUE ("email")
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admin_users"`)
    await queryRunner.query(`DROP TABLE "donation_settings"`)
    await queryRunner.query(`DROP TABLE "books"`)
    await queryRunner.query(`DROP TABLE "social_projects"`)
    await queryRunner.query(`DROP TABLE "affiliate_requests"`)
    await queryRunner.query(`DROP TABLE "events"`)
    await queryRunner.query(`DROP TABLE "documents"`)
    await queryRunner.query(`DROP TYPE "public"."admin_role_enum"`)
    await queryRunner.query(`DROP TYPE "public"."affiliate_status_enum"`)
    await queryRunner.query(`DROP TYPE "public"."document_category_enum"`)
  }
}
