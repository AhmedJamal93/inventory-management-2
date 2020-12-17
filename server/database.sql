-- items table

CREATE TABLE public.items (
    id integer NOT NULL,
    itemcode character varying(9) NOT NULL,
    description character varying(30) NOT NULL,
    qtyonhand integer NOT NULL,
    cost real NOT NULL,
    price real NOT NULL
);

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (itemcode);

CREATE UNIQUE INDEX items_itemcode_idx ON public.items USING btree (itemcode);

-- receipt table

CREATE TABLE public.receipt (
    order_id integer NOT NULL,
    dish_name text,
    supplier_id integer,
    items_id character varying NOT NULL,
    item_id character varying
);

ALTER TABLE ONLY public.receipt ALTER COLUMN order_id SET DEFAULT nextval('public.receipt_order_id_seq'::regclass);

ALTER TABLE ONLY public.receipt
    ADD CONSTRAINT receipt_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.items(itemcode);

ALTER TABLE ONLY public.receipt
    ADD CONSTRAINT receipt_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id);

-- supplier table

CREATE TABLE public.suppliers (
    id integer NOT NULL,
    name character varying NOT NULL,
    location character varying NOT NULL
);

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);

-- transaction_detail

CREATE TABLE public.transaction_detail (
    id integer NOT NULL,
    transaction_id integer,
    itemcode character varying,
    quantity integer NOT NULL
);

ALTER TABLE ONLY public.transaction_detail ALTER COLUMN id SET DEFAULT nextval('public.transaction_detail_id_seq1'::regclass);

ALTER TABLE ONLY public.transaction_detail
    ADD CONSTRAINT transaction_detail_pkey1 PRIMARY KEY (id);

ALTER TABLE ONLY public.transaction_detail
    ADD CONSTRAINT transaction_detail_itemcode_fkey FOREIGN KEY (itemcode) REFERENCES public.items(itemcode);

ALTER TABLE ONLY public.transaction_detail
    ADD CONSTRAINT transaction_detail_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id);

-- transaction

CREATE TABLE public.transactions (
    id integer NOT NULL,
    transaction_date date NOT NULL,
    supplier_id integer,
    type character varying
);

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transaction_detail_id_seq'::regclass);

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transaction_detail_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id);